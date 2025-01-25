import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
export default async function about_me(req: Request, res: Response) {
  const user: any = req.user
  const data = {
    id: user.id,
    email: user.email,
    role: user.role,
  }
  Utils.sendSuccess(res, {
    data,
  })
}
