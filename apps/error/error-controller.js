const logger = require('../../utils/logging/winston')

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProduction = (err, res) => {
  // Operational Error, trusted send error response to client
  if (err.isOperationError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    // Bug or unknown error: dont leak error response to client
    logger.error(new Error('ERROR 🎆' + err.message))
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

const ErrorController = (err, req, res, next) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProduction(err, res)
  }
}

module.exports = ErrorController
