import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import addDoctorSchema from "./schema"
export default async function add_doctor(req: Request, res: Response) {
  const { error } = addDoctorSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const doctor = await db.doctor.create({
    data: {
      ...req.body,
    },
  })
  Utils.sendSuccess(res, {
    doctor,
  })
}
