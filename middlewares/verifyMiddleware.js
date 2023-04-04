const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const secret = process.env.JWT_SECRET;

const verifyMiddleware = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers['authorization'].split(' ');
    const { _id } = jwt.verify(token, secret);
    const user = await User.findById(_id);
    if (!user || !user.token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyMiddleware;
