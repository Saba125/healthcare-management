import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_single_patient(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const patient = await db.patient.findUnique({ where: { id } })
  if (!patient) {
    return Utils.sendError(res, {
      status: "error",
      message: `Patient with id ${id} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    patient,
  })
}
