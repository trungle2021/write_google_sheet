const google = require('googleapis');

const keyFile = './credentials.json'
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const getGoogleSheet = async () => {
    const credentials = new google.auth.GoogleAuth({ keyFile, scopes });
    const authClient = await createAuthClient(credentials);
    const googleSheets = createGoogleSheetApiInstance("v4", authClient);
    return googleSheets
}

module.exports = async () => await getGoogleSheet()();