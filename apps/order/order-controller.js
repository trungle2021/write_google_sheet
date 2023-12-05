const validateOrderInput = require('../order/order-validator')
const OrderService = require('./order-service')

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
    if (validationResult.result) {
      console.log(validationResult.result)
      const orderCreated = await OrderService.createOrder(order)
      return res.status(200).json({
        status: 'success',
        data: orderCreated,
        message: 'Write data to sheet successfully'
      })
    } else {
      console.log(validationResult.result)
      return res.status(500).json({
        status: 'error',
        count: validationResult.count,
        errors: validationResult.errors,
        message: 'Write data to sheet failed'
      })
    }
  } catch (error) {
    console.log(error)
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
