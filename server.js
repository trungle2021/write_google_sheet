const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const logger = require('./utils/logging/winston')
const isProduction = process.env.NODE_ENV === 'production'
const FIREBASE_REGION = process.env.FIREBASE_REGION
const PORT = process.env.PORT_DEFAULT || 1338
const functions = require('firebase-functions')

if (isProduction) {
  // deploy with FIREBASE CLI
  exports.api = functions
    .region(FIREBASE_REGION)
    .https.onRequest(app)
} else {
  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
  })
}
