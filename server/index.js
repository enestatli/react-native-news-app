const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const { config } = require('./config');
const { logger } = require('./logger');
const router = require('./api')

const app = express();

require('./db')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router)

app.listen(config.port, () => logger.info(`Express is on ${config.port}`));
