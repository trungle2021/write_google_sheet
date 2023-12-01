const { google } = require("googleapis");

const keyFile = './credentials.json'
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const createGoogleSheetApiInstance = (version, authClient) => {
    return google.sheets({ version: version, auth: authClient });
};

const createAuthClient = async (auth) => {
    return await auth.getClient();
};

const getGoogleSheet = async () => {
    console.log("getGoogleSheet")
    const credentials = new google.auth.GoogleAuth({ keyFile, scopes });
    const authClient = await createAuthClient(credentials);
    const sheets = createGoogleSheetApiInstance("v4", authClient);
    return {
        sheets,
        authClient
    }
}

module.exports = getGoogleSheet()