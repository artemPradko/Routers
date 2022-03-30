const { createJWT, verifyJWT } = require('../utils/jwt');
const { config } = require('../config/index');
const mongoose = require('mongoose');
const { UserService } = require('../services/userServices');

async function accessTokenMiddleware(req, res, next) {
  console.info('req --', req.body);
  const accessTokenData = req.body.accessToken;
  const accessTokenResult = await verifyJWT(accessTokenData);
  const user = UserService.findById(
    mongoose.Types.ObjectId(accessTokenResult?.userId)
  );

  if (accessTokenResult === 'jwt expired') {
    const accessToken = createJWT(user.email, user._id, config.accessTokenExp);
    req.body.accessToken = accessToken;
    console.info('middleware');

    return res.status(436).json({
      data: 'Token expired'
    });
  }
  console.info('accessTokenData ---', accessTokenResult, req);

  const paramsWithTokenData = { ...req.params, accessTokenResult };

  res.locals.accessTokenResult = paramsWithTokenData;

  console.info('paramsWithTokenData --', res.locals.accessTokenResult);

  next();
}

module.exports = accessTokenMiddleware;
