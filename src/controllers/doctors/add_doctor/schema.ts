import Joi from "joi"
const addDoctorSchema = Joi.object({
  specialization: Joi.string().required(),
  yearsOfExperience: Joi.number().required(),
  availableSlots: Joi.array().items(Joi.string()).required(),
  contactInfo: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required(),
    email: Joi.string().email().required(),
  }),
})
export default addDoctorSchema
