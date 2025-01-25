import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import crypto from "crypto"
import { Request, Response } from "express"
import registerSchema from "./schema"
import { sendTestEmail } from "../../../mails/connection"
import { send_register_email } from "../../../mails"
export default async function register(req: Request, res: Response) {
  const { error } = registerSchema.validate(req.body)
  const { email, role, password } = req.body
  const oneDay = 1000 * 60 * 60 * 24
  const hashedPassword = Utils.getCryptoHash(password)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((err) => err.message),
    })
    return
  }
  const verificationCode = crypto.randomBytes(32).toString("hex")
  const codeExpirationDate = new Date(Date.now() + 1000 * 60 * 10)
  const user = await prisma.user.create({
    data: {
      email,
      role,
      password: hashedPassword,
      verificationCode,
      codeExpirationDate,
    },
  })
  const token = Utils.createToken(user)
  const verificationUrl = `http://localhost:5173/verify-email?verificationCode=${user.verificationCode}&email=${user.email}`
  await send_register_email(
    user.email,
    "Welcome",
    "Whats good",
    verificationUrl
  )
  return Utils.sendSuccess(res, {
    user,
    token,
  })
}
