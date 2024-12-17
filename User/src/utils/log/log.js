import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
      // new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/gmpapp.log' }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
       // ...(process.env.NODE_ENV === 'development' ? [new winston.transports.Console()] : [])
    ],
});

export default logger;