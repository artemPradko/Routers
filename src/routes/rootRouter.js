const { Router } = require('express');

const testRouter = require('./test');
const swapiRouter = require('./swapi');

const rootRouter = new Router();

rootRouter.use('/test', testRouter);
rootRouter.use('/swapi', swapiRouter);

module.exports = rootRouter;
