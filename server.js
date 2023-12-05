const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const googleSheetAPIConfig = require('./apps/google_sheet/config/googlesheet-config')

googleSheetAPIConfig()
const app = require('./app')
// eslint-disable-next-line func-call-spacing
const PORT = process.env.PORT_DEFAULT || 1338
// const functions = require('firebase-functions')

app.listen(PORT, () => console.log('listening on port ' + PORT))
// exports.api = functions
// .region("asia-southeast1")
// .https.onRequest(app)
