import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import editPatientSchema from "./schema"
export default async function edit_patient(req: Request, res: Response) {
  const { error } = editPatientSchema.validate(req.body)
  const id = parseInt(req.params.id)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const patient = await db.patient.update({
    where: { id },
    data: {
      ...req.body,
    },
  })
  if (!patient) {
    return Utils.sendError(res, {
      status: "error",
      message: `Patient with id ${id} not found`,
    })
  }
  Utils.sendSuccess(res, {
    patient,
  })
}
