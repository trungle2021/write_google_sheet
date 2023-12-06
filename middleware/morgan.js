const rfs = require('rotating-file-stream')
const path = require('path')
const morgan = require('morgan')
const moment = require('moment-timezone')
// const isProduction = process.env.NODE_ENV === 'production'
const LOG_SIZE = process.env.LOG_SIZE
const LOG_INTERVAL = process.env.LOG_INTERVAL
const LOG_FOLDER_NAME = process.env.LOG_FOLDER_NAME
// const LOG_FORMAT_COMPRESS = process.env.LOG_FORMAT_COMPRESS;
const LOG_ACCESS_FILE_NAME = process.env.LOG_ACCESS_FILE_NAME

const accessLog = rfs.createStream(LOG_ACCESS_FILE_NAME, {
  size: LOG_SIZE,
  interval: LOG_INTERVAL,
  path: path.join(__dirname, './../', LOG_FOLDER_NAME)
})

// moment().format('llll');

morgan.format('custom-log-format', (tokens, req, res) => {
  const time = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const responseTime = tokens['response-time'](req, res)
  const remoteAddr = tokens['remote-addr'](req, res)
  const userAgent = tokens['user-agent'](req, res)
  const httpVersion = tokens['http-version'](req, res)

  return `[${time}] ${method} ${url} HTTP/${httpVersion} ${status} ${responseTime} ms - ${remoteAddr} - ${userAgent}`
})
const MorganMiddleware = morgan('custom-log-format', { stream: accessLog })

module.exports = MorganMiddleware
