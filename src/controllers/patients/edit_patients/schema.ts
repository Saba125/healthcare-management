import Joi from "joi"
const editPatientSchema = Joi.object({
  name: Joi.string().optional(),
  age: Joi.number().optional(),
  gender: Joi.valid("Female", "Male").optional(),
  medicalHistory: Joi.string().optional(),
  allergies: Joi.array().items(Joi.string()).optional(),
  medications: Joi.array().items(Joi.string()).optional(),
  contactInfo: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional(),
    email: Joi.string().email().optional(),
  }),
})
export default editPatientSchema
