import Joi from "joi"
const addAppointmentSchema = Joi.object({
  status: Joi.valid("Pending", "Confirmed", "Canceled"),
  doctorId: Joi.number().required(),
  patientId: Joi.number().required(),
  date: Joi.date().required(),
})
export default addAppointmentSchema
