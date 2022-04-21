const jwt = require('jsonwebtoken');

const accessTokenGenerator = userId => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

module.exports = accessTokenGenerator;