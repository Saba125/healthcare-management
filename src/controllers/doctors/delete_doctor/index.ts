import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_doctor(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const doctor = await db.doctor.delete({ where: { id }, select: { id: true } })
  if (!doctor) {
    return Utils.sendError(res, {
      status: "message",
      message: `Doctor with id ${id} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    message: `Doctor deleted`,
    id: doctor,
  })
}
