const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')

const PORT = process.env.PORT_DEFAULT || 1338
// const functions = require('firebase-functions')

app.listen(PORT, () => console.log('listening on port ' + PORT))
// exports.api = functions
// .region("asia-southeast1")
// .https.onRequest(app)
