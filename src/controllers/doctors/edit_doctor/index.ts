import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import editDoctorSchema from "./schema"
import { Roles } from "@prisma/client"
export default async function edit_doctor(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user: any = req.user
  const body = req.body
  const { error } = editDoctorSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  if (user.role === Roles.Admin) {
    const doctor = await db.doctor.update({
      where: { id },
      data: {
        specialization: body.specialization,
      },
    })
    return Utils.sendSuccess(res, {
      doctor,
      message: "Doctor specialization has been updated",
    })
  } else {
    const doctor = await db.doctor.update({
      where: { id },
      data: {
        yearsOfExperience: body.yearsOfExperience,
        availableSlots: body.availableSlots,
        contactInfo: body.contactInfo,
      },
    })
    return Utils.sendSuccess(res, {
      doctor,
      message: "Doctor  has been updated",
    })
  }
}
