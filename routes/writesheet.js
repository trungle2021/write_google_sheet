const express = require('express');
const { google } = require("googleapis");
const router = express.Router();
const spreadsheetId = "1FtQyOHVwhJVl2UNs3jlN7XeF2y5JQUa1hL2ansrnH5U";
const generateRandomOrderNumber = require("../utils/generate-random-order-number.js");


router.get('/', (req,res) => {
    res.status(200).json({msg: "Hello, It's GET request!"});
})

router.post("/createOrderRequest", async (req, res) => {
  const order = req.body;
  order['order_number'] = generateRandomOrderNumber(8);
  const credentials = new google.auth.GoogleAuth({
    keyFile: "./credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const authClient = await createAuthClient(credentials);
  const googleSheets = createGoogleSheetApiInstance("v4", authClient);
  writeOrderToSheet(order, googleSheets, authClient)
  .then((response) => {
    res.status(200).json({msg: "Write successful"}); 
  })
  .catch((error) => {
    res.status(500).json({msg: error});
  });

});

const writeOrderToSheet = (order, googleSheets, auth) => {
  return new Promise(
    (resolve, reject) => {
      googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:G",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              order.order_number,
              order.name,
              order.last_name,
              order.email,
              order.phone,
              order.subject,
              order.message,
            ],
          ],
        },
      }).then((response) => {
        resolve(response.data); // Resolve with the response data
      })
      .catch((error) => {
        reject(error); // Reject with the error
      });
    }
  );
};

const createGoogleSheetApiInstance = (version, authClient) => {
  return google.sheets({ version: version, auth: authClient });
};

const createAuthClient = async (auth) => {
  return await auth.getClient();
};

module.exports = router;