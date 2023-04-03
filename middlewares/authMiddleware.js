const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const [bearer, token] = req.headers['authorization'].split(' ');
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const user = jwt.decode(token, secret)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware
