const isProduction = process.env.NODE_ENV.trim() === 'production'
const winstonLogger = require('./winston/winston')
const firebaseLogger = require('./firebase/firebase-logger')
const logger = isProduction ? firebaseLogger : winstonLogger
logger.info(`Using ${isProduction ? 'firebase logger' : 'winston logger'}`)
module.exports = logger
