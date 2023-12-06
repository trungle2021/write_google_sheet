const Joi = require('joi')

const schema = Joi.object({
  fullname: Joi.string().required().min(2).max(20),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().required(),
  address: Joi.string().required(),
  order_items: Joi.string().required(),
  height: Joi.string(),
  weight: Joi.string(),
  measurements: Joi.string(),
  message: Joi.string()
})

const validateOrderInput = (data) => {
  const { error } = schema.validate(data, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return {
      data,
      result: false,
      count: error.details.length,
      errors: errorMessages
    }
  }
  return {
    result: true,
    data
  }
}

module.exports = validateOrderInput
