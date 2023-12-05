const generateOrderNumber = require('../../utils/generateOrderNumber')

const GoogleSheetService = require('../google_sheet/service/google-sheet-service')
const INTERNATIONAL_ORDER_SPREADSHEET_ID = process.env.INTERNATIONAL_ORDER_SPREADSHEET_ID

const createOrder = async (order) => {
  const sheetName = await GoogleSheetService.getNameOfFirstSheet(INTERNATIONAL_ORDER_SPREADSHEET_ID)
  const { lastValue } = await GoogleSheetService.getLatestValueOfColumn(INTERNATIONAL_ORDER_SPREADSHEET_ID, sheetName, 'B:B')
  order._id = generateOrderNumber(lastValue, 6)
  await GoogleSheetService.create(order, INTERNATIONAL_ORDER_SPREADSHEET_ID, sheetName, 'A:K')
  return order
}

module.exports = {
  createOrder
}
