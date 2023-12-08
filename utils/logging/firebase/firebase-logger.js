const moment = require('moment-timezone')
const functions = require('firebase-functions')
const firebaseLogger = functions.logger

const loggingRequest = (req, res, next) => {
  const time = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
  const method = req.method
  const url = req.url
  const status = res.statusCode
  const responseTime = tokens['response-time'](req, res)
  const remoteAddr = tokens['remote-addr'](req, res)
  const userAgent = tokens['user-agent'](req, res)
  const httpVersion = tokens['http-version'](req, res)

  return `[${time}] ${method} ${url} HTTP/${httpVersion} ${status} ${responseTime} ms - ${remoteAddr} - ${userAgent}`
}
module.exports = { firebaseLogger, loggingRequest }
