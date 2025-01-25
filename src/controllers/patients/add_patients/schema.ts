import Joi from "joi"
const patientSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.valid("Female", "Male").required(),
  medicalHistory: Joi.string().required(),
  allergies: Joi.array().items(Joi.string()).required(),
  medications: Joi.array().items(Joi.string()).required(),
  contactInfo: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required(),
    email: Joi.string().email().required(),
  }),
})
export default patientSchema
