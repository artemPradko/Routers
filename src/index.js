const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');

const { config: appConfig } = require('./config/index');
const rootRouter = require('./routes/rootRouter');
const accessTokenMiddleware = require('./middlewares/accessTokenMiddleware');

config();

function main() {
  const app = express();
  const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
  };

  app.use(cors(corsOptions)); // Use this after the variable declaration

  app.use(express.json());

  mongoose.connect(appConfig.database, { useNewUrlParser: true }).catch((e) => {
    console.error('Connection error', e.message);
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // app.use(accessTokenMiddleware);

  app.use('/', rootRouter);

  const port = process.env.PORT;

  console.info('port --', port);

  app.listen(port, () => {
    console.info('server listen on port', port);
  });
}

main();
