const { google } = require('googleapis')
const API_VERSION = process.env.GOOGLE_SHEET_API_VERSION
const getGoogleSheetCredentials = require('./googlesheet-credentials')
const getGoogleSheetAuthClientByCredentials = require('./googlesheet-auth-client')

const googleSheetAPIConfig = async () => {
  const credentials = await getGoogleSheetCredentials()
  console.log('Load credentials successfully')
  const authClient = await getGoogleSheetAuthClientByCredentials(credentials)
  console.log('Load auth client successfully')
  const sheetAPI = google.sheets({ version: API_VERSION, auth: authClient })
  console.log('Create Google Sheet API successfully')
  return {
    credentials,
    authClient,
    sheetAPI
  }
}

module.exports = googleSheetAPIConfig
