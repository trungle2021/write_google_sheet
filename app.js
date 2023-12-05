const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./routes/router')

app.use(express.json())
app.use(cors())
app.use('/lider', apiRouter)

app.get('/', (req, res) => {
  res.json('Server Started')
})

module.exports = app
