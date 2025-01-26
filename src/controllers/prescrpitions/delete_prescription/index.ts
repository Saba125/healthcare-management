import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_prescription(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const prescription = await db.prescription.delete({ where: { id } })
  if (!prescription) {
    return Utils.sendError(res, {
      status: "error",
      message: `Prescription with id ${id} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    message: `Precription has been deleted`,
  })
}
