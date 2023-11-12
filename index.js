const express = require("express");
const app = express();
const cors = require("cors");
const writesheet = require("./routes/writesheet");
const functions = require('firebase-functions')
const port = 1337

app.use(express.json());
app.use(cors());
app.use("/lider/writesheet/",writesheet)


app.get("/", (req, res) => {
  res.json("Ty khùng");
});

// app.listen(port, () => console.log('listening on port ' + port));
exports.api = functions
.region("asia-southeast1")              
.https.onRequest(app)