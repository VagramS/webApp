const fs = require('fs');
const winston = require('winston');

const logDir = 'logs';

// Create the log directory if it does not exist
if(!fs.existsSync(logDir))
    fs.mkdirSync(logDir);

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}, ${timestamp}  `;
});

const logger = winston.createLogger({
    transports: [ new winston.transports.Console({
            format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize({all: true})), // colorize the output to the console
            myFormat,
        }),

        new winston.transports.File({
            filename: `${logDir}/error.log`,
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                myFormat
            ),
        }),

        new winston.transports.File({
            filename: `${logDir}/mixed.log`,
            format: winston.format.combine(
                winston.format.timestamp(),
                myFormat
            ),
        }),
    ],
});

module.exports = logger;