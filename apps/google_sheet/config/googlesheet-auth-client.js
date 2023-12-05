const getGoogleSheetAuthClientByCredentials = async (credentials) => {
  return credentials.getClient()
}

module.exports = getGoogleSheetAuthClientByCredentials
