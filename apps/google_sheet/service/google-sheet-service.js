const googleSheetAPIConfig = require('./../config/googlesheet-config')

const googleSheetService = googleSheetAPIConfig().then(({ authClient, sheetAPI }) => {
  const getNameOfChildSheet = async (spreadsheetId, indexOfChild) => {
    const response = await sheetAPI.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title'
    })
    return response.data.sheets[indexOfChild].properties.title
  }

  const getLatestValueOfColumn = async (spreadsheetId, sheetName, range) => {
    // Open the Google Sheet file
    const response = await sheetAPI.spreadsheets.values.get(
      {
        spreadsheetId,
        range: `${sheetName}!${range}`, // Assuming the data is in the first column of the first sheet
        majorDimension: 'COLUMNS'
      })

    const { values } = response.data
    if (values.length <= 0) {
      console.log('No data found.')
      return null
    }

    const lastRowValues = values[0] // Values of the last row in column 1
    let lastValue = 0
    if (lastRowValues.length !== 2) {
      lastValue = lastRowValues[lastRowValues.length - 1]
      if (Number.isNaN(lastValue)) {
        throw new Error(`Last Order ID is not a number${lastRowValues}`)
      }
    }
    return { lastValue }
  }

  const create = async (data, spreadsheetId
    , sheetName, range) => {
    const propertyValues = Object.values(data)
    const response = sheetAPI.spreadsheets.values
      .append({
        auth: authClient,
        spreadsheetId,
        range: `${sheetName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [
            [
              ...propertyValues
            ]
          ]
        }
      })
    return response
  }

  return {
    getNameOfChildSheet,
    getLatestValueOfColumn,
    create
  }
})

module.exports = googleSheetService
