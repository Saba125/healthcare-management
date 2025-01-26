import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import { send_appointment_cancel } from "../../../mails"

export default async function cancel_appointment(req: Request, res: Response) {
  const id = parseInt(req.params.id)

  const appointment = await db.appointment.delete({
    where: { id },
    include: {
      patient: true,
    },
  })

  if (!appointment) {
    return Utils.sendError(res, {
      status: "error",
      message: `Appointment with id ${id} is not found`,
    })
  }

  const contactInfo = appointment.patient.contactInfo as {
    email: string
  } | null

  if (contactInfo && contactInfo.email) {
    await send_appointment_cancel(contactInfo.email, "Appointment cancellation")
  } else {
    return Utils.sendError(res, {
      status: "error",
      message: "Patient's email not found, cannot send cancellation email",
    })
  }

  // Respond with success message
  Utils.sendSuccess(res, {
    message: `Appointment has been canceled and an email has been sent.`,
  })
}
