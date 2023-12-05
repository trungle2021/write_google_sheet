const Joi = require('joi')

const schema = Joi.object({
  fullname: Joi.string().required().min(2).max(20),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().required(),
  address: Joi.string().required(),
  order_items: Joi.string().required(),
  message: Joi.string().required()
})

const validateOrderInput = (data) => {
  const { error } = schema.validate(data)
  if (error) {
    return {
      result: false,
      count: error.details.length,
      errors: error.details.map((detail) => detail.message)
    }
  }
  return {
    result: true,
    data
  }
}

module.exports = validateOrderInput
