const fs = require('fs');
const winston = require('winston');
const moment = require('moment-timezone');

const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir))
  fs.mkdirSync(logDir);

const myFormat = winston.format.printf(({ level, message, timestamp }) => `${level}: ${message}, ${timestamp}  `);

const logger = winston.createLogger({
  transports: [new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize({ all: true }),
    ), // colorize the output to the console
    myFormat,
  }),

  new winston.transports.File({
    filename: `${logDir}/error.log`,
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({
        format: () => moment().tz('Europe/Madrid').format(),
      }),
      myFormat,
    ),
  }),

  new winston.transports.File({
    filename: `${logDir}/mixed.log`,
    format: winston.format.combine(
      winston.format.timestamp({
        format: () => moment().tz('Europe/Madrid').format(),
      }),
      myFormat,
    ),
  }),
  ],
});

module.exports = logger;
