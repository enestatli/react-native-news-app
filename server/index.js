const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const { config } = require('./config');
const { logger } = require('./logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.port, () => logger.info(`Express is on ${config.port}`));
