const express = require('express')
const apiRouter = express()
const OrderRouter = require('../apps/order/order-router')

apiRouter.use('/orders', OrderRouter)

module.exports = apiRouter
