import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_patient(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const patient = await db.patient.delete({
    where: { id },
    select: { id: true },
  })
  if (!patient) {
    return Utils.sendError(res, {
      status: "error",
      message: `Patient with id ${id} not found`,
    })
  }
  Utils.sendSuccess(res, {
    message: `Deleted patient`,
    patient,
  })
}
