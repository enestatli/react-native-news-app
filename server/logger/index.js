const winston = require('winston');
var colors = require('colors/safe');

const prodLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

const devLogger = {
  info: (msg) => console.log(colors.red.underline(msg)),
};

module.exports =
  process.env.NODE_ENV === 'development'
    ? { logger: devLogger }
    : { logger: prodLogger };
