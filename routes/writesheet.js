// const express = require('express')

// const router = express.Router()

// const spreadsheetId = '1mc1gBy62CG389XSssR23LAKKokMGnOOUZB1a5oEeXBc'
// const getGoogleSheetAndAuthClient = require('../googlesheet')
// const generateOrderNumber = require('../utils/generateOrderNumber')
// const formatOrderItems = require('../utils/formatOrderItems')
// const getCurrentDateTime = require('../utils/getCurrentDate')

// router.post('/', async (req, res) => {
//   const { sheets, authClient } = await getGoogleSheetAndAuthClient()
//   const order = req.body
//   getNameOfFirstSheet(sheets).then((nameOfFirstSheet) => {
//     const googleSheetModified = {
//       ...sheets,
//       sheet_name: nameOfFirstSheet
//     }
//     return getLatestRowInSheet(googleSheetModified, spreadsheetId)
//   }).then((data) => {
//     const { lastValue } = data
//     const googleSheetModified = data.googleSheets
//     order.order_number = generateOrderNumber(lastValue, 6)
//     order.order_items = formatOrderItems(order.order_items)
//     order.order_date = getCurrentDateTime()
//     order.status = 'IN PROGRESS'
//     return writeOrderToSheet(order, googleSheetModified, authClient)
//   })
//     .then((data) => {
//       res.status(200).json({ data, msg: 'Write successful' })
//     })
//     .catch((err) => {
//       console.error('Error:', err)
//       res.status(500).json({ msg: err })
//     })
// })

// const getLatestRowInSheet = (googleSheets, spreadsheetId) => {
//   const sheetName = googleSheets.sheet_name
//   return new Promise((resolve, reject) => {
//     // Open the Google Sheet file
//     googleSheets.spreadsheets.values.get(
//       {
//         spreadsheetId,
//         range: `${sheetName}!B:B`, // Assuming the data is in the first column of the first sheet
//         majorDimension: 'COLUMNS'
//       },
//       (err, res) => {
//         if (err) {
//           // eslint-disable-next-line prefer-promise-reject-errors
//           reject('Error opening the Google Sheet file:', err)
//           return
//         }

//         const { values } = res.data
//         if (values.length <= 0) {
//           console.log('No data found.')
//           resolve(null)
//           return
//         }

//         const lastRowValues = values[0] // Values of the last row in column 1
//         let lastValue = 0
//         if (lastRowValues.length !== 2) {
//           lastValue = lastRowValues[lastRowValues.length - 1]
//           if (Number.isNaN(lastValue)) {
//             // eslint-disable-next-line prefer-promise-reject-errors
//             reject(`Last Order ID is not a number${lastRowValues}`)
//           }
//         }
//         resolve({ lastValue, googleSheets })
//       }
//     )
//   })
// }

// const writeOrderToSheet = (order, googleSheets, auth) => {
//   const sheetName = googleSheets.sheet_name
//   return new Promise((resolve, reject) => {
//     googleSheets.spreadsheets.values
//       .append({
//         auth,
//         spreadsheetId,
//         range: `${sheetName}!A:K`,
//         valueInputOption: 'USER_ENTERED',
//         resource: {
//           values: [
//             [
//               order.status,
//               order.order_number,
//               order.fullname,
//               order.email,
//               order.phone,
//               order.country,
//               order.postal_code,
//               order.address,
//               order.order_items,
//               order.message,
//               order.order_date
//             ]
//           ]
//         }
//       })
//       .then(() => {
//         resolve(order) // Resolve with the response data
//       })
//       .catch((error) => {
//         reject(error) // Reject with the error
//       })
//   })
// }

// const getNameOfFirstSheet = async (sheets) => new Promise((resolve, reject) => {
//   sheets.spreadsheets.get({
//     spreadsheetId,
//     fields: 'sheets.properties.title'
//   }).then((response) => {
//     const firstSheetName = response.data.sheets[0].properties.title
//     resolve(firstSheetName)
//   }).catch((error) => {
//     reject(error)
//   })
// })
// module.exports = router
