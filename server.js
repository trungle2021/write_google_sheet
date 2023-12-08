const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const logger = require('./utils/logging/logger')
const isProduction = process.env.NODE_ENV.trim() === 'production'
const FIREBASE_REGION = process.env.FIREBASE_REGION
const PORT = process.env.PORT_DEFAULT || 1338
const functions = require('firebase-functions')

if (isProduction) {
  logger.info('Firebase production')
  exports.api = functions
    .region(FIREBASE_REGION)
    .https.onRequest(app)
} else {
  logger.info('Local development')
  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
  })
}
