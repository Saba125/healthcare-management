import Joi from "joi"
const editDoctorSchema = Joi.object({
  specialization: Joi.string().optional(),
  yearsOfExperience: Joi.number().optional(),
  availableSlots: Joi.array().items(Joi.string()).optional(),
  contactInfo: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional(),
    email: Joi.string().email().optional(),
  }),
})
export default editDoctorSchema
