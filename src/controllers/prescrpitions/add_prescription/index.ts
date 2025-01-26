import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import createPDF from "../../../pdfs/export"
import addPrescrpitionSchema from "./schema"
export default async function add_prescrpition(req: Request, res: Response) {
  const { error } = addPrescrpitionSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const prescription = await db.prescription.create({
    data: {
      ...req.body,
    },
    include: {
      patient: true,
    },
  })
  createPDF.generatePrescriptionPDF(
    res,
    prescription.patient.name,
    prescription.diagnosis,
    prescription.treatment,
    prescription.prescriptions
  )
}
