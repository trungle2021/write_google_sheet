const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const apiRouter = require('./routes/router')
const AppError = require('./apps/error/app-error')
const ErrorController = require('./apps/error/error-controller')
const isProduction = process.env.NODE_ENV.trim() === 'production'
const MorganMiddleware = require('./utils/logging/morgan/morgan')

app.use(helmet())
!isProduction && app.use(MorganMiddleware)
app.use(express.json())
app.use(cors())
app.use('/lider', apiRouter)

app.get('/', (req, res) => {
  res.json('Server Started')
})

// Handle Unhandle middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController)
module.exports = app
