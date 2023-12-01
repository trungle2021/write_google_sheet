const express = require("express");

const router = express.Router();

// const spreadsheetId = "1FtQyOHVwhJVl2UNs3jlN7XeF2y5JQUa1hL2ansrnH5U";
const spreadsheetId = "1mc1gBy62CG389XSssR23LAKKokMGnOOUZB1a5oEeXBc";
const getGoogleSheet = require('./../googlesheet.js')
const generateOrderNumber = require("../utils/generateOrderNumber.js");
const formatOrderItems = require("../utils/formatOrderItems.js");
const getCurrentDateTime = require("../utils/getCurrentDate.js");



router.post("/", async (req, res) => {
  const googleSheets = await getGoogleSheet;
  
  const order = req.body;
  getNameOfFirstSheet(googleSheets).then(nameOfFirstSheet => {
    const googleSheetModified = {
      ...googleSheets,
      sheet_name : nameOfFirstSheet
    }
    return getLatestRowInSheet(googleSheetModified, spreadsheetId)
  }).then((lastValue, googleSheets) => {
    order["order_number"] = generateOrderNumber(lastValue, 6);
    order["order_items"] = formatOrderItems(order["order_items"]);
    order["order_date"] = getCurrentDateTime();
    order["status"] = 'IN PROGRESS';
    return writeOrderToSheet(order, googleSheets, authClient);
  })
    .then((data) => {
      res.status(200).json({ data: data, msg: "Write successful" });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ msg: err });
    });
});

const getLatestRowInSheet = (googleSheets, spreadsheetId, nameOfFirstSheet) => {

  return new Promise((resolve, reject) => {
    // Open the Google Sheet file
    googleSheets.spreadsheets.values.get(
      {
        spreadsheetId,
        range: `${sheetName}!B:B`, // Assuming the data is in the first column of the first sheet
        majorDimension: "COLUMNS",
      },
      (err, res) => {
        if (err) {
          reject("Error opening the Google Sheet file:", err);
          return;
        }

        const values = res.data.values
        if (values.length <= 0) {
          console.log("No data found.");
          resolve(null);
          return;
        }

        const lastRowValues = values[0]; // Values of the last row in column 1
        let lastValue = 0
        if (lastRowValues.length !== 2) {
          lastValue = lastRowValues[lastRowValues.length - 1];
          if (Number.isNaN(lastValue)) {
            reject("Last Order ID is not a number" + lastRowValues)
          }
        }
        resolve(lastValue, googleSheets);
      }
    );
  });
};

const writeOrderToSheet = (order, googleSheets, auth) => {
  const sheetName = googleSheets['sheet_name']

  return new Promise((resolve, reject) => {
    googleSheets.spreadsheets.values
      .append({
        auth,
        spreadsheetId,
        range: `${sheetName}!A:K`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              order.status,
              order.order_number,
              order.fullname,
              order.email,
              order.phone,
              order.country,
              order.postal_code,
              order.address,
              order.order_items,
              order.message,
              order.order_date,
            ],
          ],
        },
      })
      .then(() => {
        resolve(order); // Resolve with the response data
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
  });
};

const getNameOfFirstSheet = async (sheets) => {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title'
    }).then(response => {
      const firstSheetName = response.data.sheets[0].properties.title;
      resolve(firstSheetName)
    }).catch(error => {
      reject(error)
    })


  })
}
module.exports = router;
