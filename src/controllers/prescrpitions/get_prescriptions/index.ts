import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_prescriptions(req: Request, res: Response) {
  const patientId = parseInt(req.params.patientId)
  const prescriptions = await db.prescription.findMany({
    where: {
      patientId,
    },
  })
  Utils.sendSuccess(res, {
    prescriptions,
  })
}
