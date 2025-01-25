import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import patientSchema from "./schema"
export default async function add_patient(req: Request, res: Response) {
  const { error } = patientSchema.validate(req.body)
 
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const patient = await db.patient.create({
    data: {
      ...req.body,
    },
  })
  Utils.sendSuccess(res, {
    patient,
  })
}
