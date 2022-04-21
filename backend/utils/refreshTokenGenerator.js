const jwt = require('jsonwebtoken');

const refreshTokenGenerator = userId => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = refreshTokenGenerator;