/* eslint-disable react-hooks/rules-of-hooks */
const express = require('express');

require('dotenv').config();

const { config } = require('./config');
const { logger } = require('./logger');
const { useMiddlewares } = require('./middleware');
const router = require('./api');

const app = express();

require('./db');

useMiddlewares(app);

app.use('/api', router);

app.listen(config.port, () => logger.info(`Express is on ${config.port}`));
