const { Router } = require('express');

const { authenticate } = require('../utils/authentication');
const accountRouter = require('./accountRoute');
const userRouter = require('./userRoute');
const authRouter = require('./authRoute');
const swapiRouter = require('./swapi');
const testRouter = require('./test');

const rootRouter = new Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/test', testRouter);
rootRouter.use('/swapi', swapiRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/account', accountRouter);

module.exports = rootRouter;
