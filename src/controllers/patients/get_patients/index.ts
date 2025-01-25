import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_patients(req: Request, res: Response) {
  const { search, age, gender } = req.query
  const filters: any = {}
  if (search) {
    filters.OR = [{ name: { contains: search as string, mode: "insensitive" } }]
  }
  if (age) {
    filters.age = Number(age)
  }
  if (gender) {
    filters.gender = gender
  }
  const patients = await db.patient.findMany({ where: filters })

  if (!patients) {
    return Utils.sendError(res, {
      status: "error",
      message: `Patients not found`,
    })
  }
  Utils.sendSuccess(res, {
    patients,
  })
}
