const winston = require('winston')
const path = require('path')
const LOG_ERROR_FILE_NAME = process.env.LOG_ERROR_FILE_NAME
const LOG_INFO_FILE_NAME = process.env.LOG_INFO_FILE_NAME
const LOG_FOLDER_NAME = process.env.LOG_FOLDER_NAME

const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
  if (stack) {
    return `[${timestamp}] [${level.toUpperCase()}] ${stack}`
  }
  return `[${timestamp}] [${level}] ${message}`
})

module.exports = winston.createLogger({
  // format của log được kết hợp thông qua format.combine
  format: winston.format.combine(
    winston.format.splat(),
    // Định dạng time cho log
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // thiết lập định dạng của log
    logFormat
  ),
  transports: [
    // Thiết lập ghi info log vào file info.log
    new winston.transports.File({
      level: 'info',
      filename: path.join(__dirname, './../../', LOG_FOLDER_NAME, LOG_INFO_FILE_NAME)
    }),

    // Thiết lập ghi các errors vào file error.log
    new winston.transports.File({
      level: 'error',
      filename: path.join(__dirname, './../../', LOG_FOLDER_NAME, LOG_ERROR_FILE_NAME)
    })
  ]
})
