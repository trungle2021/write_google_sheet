const validateOrderInput = require('../order/order-validator')
const OrderService = require('./order-service')
const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const AppError = require('../error/app-error')
const logger = require('../../utils/logging/logger')

const showInfo = (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'Order Controller Hello'
  })
}
const createOrder = catchAsyncHandler(async (req, res, next) => {
  const order = req.body
  const validationResult = validateOrderInput(order)
  if (validationResult.result) {
    const orderCreated = await OrderService.createOrder(order)
    logger.info(`Order created: ${orderCreated}`)
    return res.status(200).json({
      status: 'success',
      data: orderCreated,
      message: 'Write data to sheet successfully'
    })
  } else {
    return next(new AppError('Validation Error', validationResult, 400))
  }
})

module.exports = {
  showInfo,
  createOrder
}
