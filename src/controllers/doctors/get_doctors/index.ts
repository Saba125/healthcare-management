import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
export default async function get_doctors(req: Request, res: Response) {
  const filters: any = {}
  const { search, experience } = req.query
  if (search) {
    filters.OR = [
      {
        specialization: {
          contains: search as string,
          mode: "insensitive",
        },
      },
    ]
  }
  if (experience) {
    filters.yearsOfExperience = Number(experience)
  }
  const doctors = await db.doctor.findMany({
    where: filters,
  })
  Utils.sendSuccess(res, {
    doctors,
  })
}
