import Joi from "joi"
const addPrescrpitionSchema = Joi.object({
  diagnosis: Joi.string().required(),
  treatment: Joi.string().required(),
  prescriptions: Joi.array().items(Joi.string()).required(),
  patientId: Joi.number().required(),
  doctorId: Joi.number().required(),
})
export default addPrescrpitionSchema
