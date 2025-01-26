import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_single_prescription(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id)
  const prescription = await db.prescription.findUnique({
    where: {
      id,
    },
  })
  if (!prescription) {
    return Utils.sendError(res, {
      status: "erro",
      message: `Prescrpition with id ${id} is njot found`,
    })
  }
  Utils.sendSuccess(res, {
    prescription,
  })
}
