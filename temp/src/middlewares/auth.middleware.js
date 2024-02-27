const JwtToken = require('../utils/jwt.utils');

const authMiddleware = (req, res, next) => {
  console.log('hello from middleware', req.url);
  if (req.url === '/login' || req.url === '/signup') {
    next();
  } else {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid authorization header' });
    }

    const token = authorizationHeader.replace('Bearer ', '');

    if (!token || token === null) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization token not found' });
    }

    try {
      const decoded = JwtToken.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  }
  return null;
};

module.exports = authMiddleware;
