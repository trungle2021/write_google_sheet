const express = require("express");
const { google } = require("googleapis");
const router = express.Router();
const spreadsheetId = "1FtQyOHVwhJVl2UNs3jlN7XeF2y5JQUa1hL2ansrnH5U";
const generateOrderNumber = require("../utils/generate-order-number.js");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello, It's GET request!" });
});

router.post("/createOrderRequest", async (req, res) => {
  const order = req.body;

  const credentials = new google.auth.GoogleAuth({
    keyFile: "./credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const authClient = await createAuthClient(credentials);
  const googleSheets = createGoogleSheetApiInstance("v4", authClient);
  getLatestRowInSheet(googleSheets, spreadsheetId)
    .then((lastValue) => {
      order["order_number"] = generateOrderNumber(lastValue, 6);
      console.log(order["order_number"]);
      return writeOrderToSheet(order, googleSheets, authClient);
    })
    .then(() => {
      res.status(200).json({ msg: "Write successful" });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ msg: err });
    });
});

const getLatestRowInSheet = (googleSheets, spreadsheetId) => {
  return new Promise((resolve, reject) => {
    // Open the Google Sheet file
    googleSheets.spreadsheets.values.get(
      {
        spreadsheetId,
        range: "Sheet1!A:A", // Assuming the data is in the first column of the first sheet
        majorDimension: "COLUMNS",
      },
      (err, res) => {
        if (err) {
          reject("Error opening the Google Sheet file:", err);
          return;
        }

        const values = res.data.values;
        if (values.length === 0) {
          console.log("No data found.");
          resolve(null);
          return;
        }

        const lastRowValues = values[0]; // Values of the last row in column 1
        const lastValue = lastRowValues[lastRowValues.length - 1];
        console.log("last value" + lastValue);
        resolve(lastValue);
      }
    );
  });
};

const writeOrderToSheet = (order, googleSheets, auth) => {
  return new Promise((resolve, reject) => {
    googleSheets.spreadsheets.values
      .append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:I",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              order.order_number,
              order.fullname,
              order.email,
              order.phone,
              order.country,
              order.postal_code,
              order.address,
              order.order_items,
              order.message,
            ],
          ],
        },
      })
      .then((response) => {
        resolve(response.data); // Resolve with the response data
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
  });
};

const createGoogleSheetApiInstance = (version, authClient) => {
  return google.sheets({ version: version, auth: authClient });
};

const createAuthClient = async (auth) => {
  return await auth.getClient();
};

module.exports = router;
