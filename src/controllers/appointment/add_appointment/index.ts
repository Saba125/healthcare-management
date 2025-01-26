import Utils from "../../../utils/index"
import db from "../../../db/index"
import { Request, Response } from "express"
import addAppointmentSchema from "./schema"
import { send_appointment_creating } from "../../../mails"

type ContactInfo = {
  email: string
  phone: string
}

export default async function add_appointment(req: Request, res: Response) {
  const { error } = addAppointmentSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }

  const appointment = await db.appointment.create({
    data: {
      ...req.body,
    },
    include: {
      patient: true,
    },
  })

  // Cast patient to a type where contactInfo is defined as ContactInfo | null
  const patient = appointment.patient

  // Check if contactInfo exists and is of type ContactInfo
  if (patient.contactInfo) {
    const contactInfo = patient.contactInfo as ContactInfo // Type assertion

    // Now TypeScript knows contactInfo is of type ContactInfo
    const email = contactInfo.email

    // Ensure email exists before sending email
    if (email) {
      await send_appointment_creating(email, "Appointment has been created")
    } else {
      return Utils.sendError(res, {
        status: "error",
        message: "Patient email is missing.",
      })
    }
  } else {
    return Utils.sendError(res, {
      status: "error",
      message: "Patient contact information is missing.",
    })
  }

  Utils.sendSuccess(res, {
    appointment,
  })
}
