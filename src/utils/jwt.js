const jwt = require('jsonwebtoken');

const { config } = require('../config/index');

exports.createJWT = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration
  };

  return jwt.sign(payload, config.tokenSecret, {
    expiresIn: Number(duration)
  });
};

exports.verifyJWT = (token) => {
  try {
    const tokenData = jwt.verify(token, config.tokenSecret);

    const currentTime = new Date().getTime();
    const someArray = String(currentTime);
    const fixedTime = someArray.slice(0, 10);
    console.info(
      'tokenData ---',
      tokenData,
      Number(fixedTime) < tokenData.exp,
      Number(fixedTime),
      tokenData.exp
    );

    if (Number(fixedTime) < tokenData.exp === true) {
      return tokenData;
    }

    return false;
  } catch (err) {
    console.info('jwt error ---', err, typeof err, Object.entries(err));
    if (err.message === 'jwt expired') {
      return 'jwt expired';
    }
    return err;
  }
};
