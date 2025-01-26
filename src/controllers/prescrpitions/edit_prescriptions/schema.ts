import Joi from "joi"
const editPrescriptionSchema = Joi.object({
  diagnosis: Joi.string().optional(),
  treatment: Joi.string().optional(),
  prescriptions: Joi.array().items(Joi.string()).optional(),
  patientId: Joi.number().optional(),
  doctorId: Joi.number().optional(),
})
export default editPrescriptionSchema
