import Utils from "../../../utils/index"
import db from "../../../db/index"
import crypto from "crypto"
import { Request, Response } from "express"
export default async function verify_email(req: Request, res: Response) {
  const { email, verificationCode } = req.body
  const user = await db.user.findUnique({
    where: { email },
  })
  if (!user) {
    return Utils.sendError(res, {
      status: "error",
      message: "User not found",
    })
  }
  const currentDate = new Date()
  if (
    user.verificationCode !== verificationCode ||
    user.codeExpirationDate! < currentDate
  ) {
    return Utils.sendError(res, {
      status: "error",
      message: "Verification failed",
    })
  }
  await db.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationCode: null,
      codeExpirationDate: null,
    },
  })
  return Utils.sendSuccess(res, {
    status: "success",
    message: "Email successfully verified.",
  })
}
