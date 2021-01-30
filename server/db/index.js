const mongoose = require('mongoose');

const { config } = require('../config');
const { logger } = require('../logger');

mongoose
  .connect(`${config.dbUri}/${config.dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`Connected to mongodb: ${config.dbUri}/${config.dbName}`);
  });

mongoose.connection.on('error', (err) => {
  logger.info(err);
});
