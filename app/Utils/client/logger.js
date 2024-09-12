const fs = require('fs');
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const moment = require('moment-timezone');
require('dotenv').config();

const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) 
  fs.mkdirSync(logDir);

const myFormat = winston.format.printf(({ level, message, timestamp }) => `${level}: ${message}, ${timestamp}\n`);

const logger = winston.createLogger({
  level: 'debug',  // Set lowest level to ensure all levels are logged
  transports: [
    // Console Transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }), // colorize the output to the console
        myFormat
      ),
    }),

    // CloudWatch Transport
    new WinstonCloudWatch({
      logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,  // Ensure this exists
      logStreamName: process.env.CLOUDWATCH_STREAM_NAME || 'default-log-stream',
      awsRegion: process.env.AWS_REGION,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      logEventsBatchSize: 1,  // Send logs immediately
      logEventsBatchTimeout: 1000,  // Reduce batch timeout to 1 second
      messageFormatter: ({ level, message }) => `[${level}] : ${message}`,
      debug: true,  // Enable debug mode
    }),

    // File Transport for errors
    new winston.transports.File({
      filename: `${logDir}/error.log`,
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().tz('Europe/Madrid').format(),  // Set timezone
        }),
        myFormat
      ),
    }),

    // File Transport for mixed logs (all levels)
    new winston.transports.File({
      filename: `${logDir}/mixed.log`,
      level: 'debug',  // Capture all log levels
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().tz('Europe/Madrid').format(),  // Set timezone
        }),
        myFormat
      ),
    }),
  ],
});

module.exports = logger;
