// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

class JwtToken {
  static generateJWTToken(userName, email) {
    const data = {
      userName,
      email,
    };
    return jwt.sign(data, 'my project');
  }

  static verifyToken(token) {
    try {
      const user = jwt.verify(token, 'my project');
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = JwtToken;
