const formatOrderItems = require('../../utils/formatOrderItems')
const getCurrentDateTime = require('../../utils/getCurrentDate')
const validateOrderInput = require('../order/order-validator')
const OrderService = require('./order-service')
const orderStatus = require('./order-status')

const showInfo = (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'Order Controller Hello'
  })
}
const createOrder = async (req, res, next) => {
  try {
    const order = req.body
    const validationResult = validateOrderInput(order)
    order.order_items = formatOrderItems(order.order_items)
    order.order_date = getCurrentDateTime()
    order.status = orderStatus.IN_PROGRESS
    if (validateOrderInput) {
      const orderCreated = await OrderService.createOrder(order)
      return res.status(200).json({
        status: 'success',
        data: orderCreated,
        message: 'Write data to sheet successfully'
      })
    } else {
      return res.status(500).json({
        status: 'error',
        count: validationResult.count,
        errors: validationResult.errors,
        message: 'Write data to sheet failed'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error,
      message: 'Write data to sheet failed'
    })
  }
}

module.exports = {
  showInfo,
  createOrder
}
