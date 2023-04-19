const express = require('express');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const service = require('../../services/users.service');
const { registerSchema, loginSchema } = require('../../schemas/users.schema');
const { verifyMiddleware, uploadMiddleware } = require('../../middlewares/index');
const User = require('../../models/users.model');

const router = express.Router();
const secret = process.env.JWT_SECRET;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

router.post('/register', async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const { email, password } = req.body;
    const user = await service.findByEmail(email);
    if (user) {
      return res.status(409).json({ message: 'Email in use' });
    }
    const avatarURL = gravatar.url(email);
    const newUser = await service.registration(email, password, avatarURL);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const { email, password } = req.body;
    const user = await service.findByEmail(email);
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: ' "Email or password is wrong"' });
    }
    const payload = {
      _id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: { email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', verifyMiddleware, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
});

router.get('/current', verifyMiddleware, async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await service.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/avatars',
  verifyMiddleware,
  uploadMiddleware.single('avatar'),
  async (req, res, next) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    try {
      const resultUpload = path.join(avatarDir, filename);
      const image = await Jimp.read(tempUpload);
      await image.resize(250, 250).write(tempUpload);
      await fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join("avatars", filename);
      const updateAvatar = await User.findByIdAndUpdate(_id, { avatarURL });
      if (!updateAvatar) {
        return res.status(401).json({ message: "Not authorized" });
      }
      return res.status(200).json({ avatarURL });
    } catch (error) {
      await fs.unlink(tempUpload);
      throw error;
    }
  }
);

module.exports = router;
