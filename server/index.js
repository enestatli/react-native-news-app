const express = require('express');
var bodyParser = require('body-parser');

require('dotenv').config();

const { config } = require('./config');
const { logger } = require('./logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  res.json(req.body);
});

app.listen(config.port, () => logger.info(`Express is on ${config.port}`));
