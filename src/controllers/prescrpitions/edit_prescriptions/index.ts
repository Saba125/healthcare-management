import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import editPrescriptionSchema from "./schema"
export default async function edit_prescription(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const { error } = editPrescriptionSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const prescription = await db.prescription.update({
    where: { id },
    data: {
      ...req.body,
    },
  })
  Utils.sendSuccess(res, {
    prescription,
  })
}
