import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
import roleMiddleware from "../middlewares/permission"
import { Roles } from "@prisma/client"
import patientsController from "../controllers/patients/export"
import doctorsController from "../controllers/doctors/export"
import appointmentController from "../controllers/appointment/export"
import prescrpitionsController from "../controllers/prescrpitions/export"
const Router = express.Router()
// user
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
Router.get("/auth/aboutMe", authMiddleware, usersController.about_me)
Router.post("/auth/verifyEmail", usersController.verify_email),
  // patients
  Router.get(
    "/patients",
    authMiddleware,
    roleMiddleware(Roles.Admin),
    patientsController.get_patients
  )
Router.post(
  "/patients",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  patientsController.add_patient
)
Router.put(
  "/patients/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  patientsController.edit_patient
)
Router.get(
  "/patients/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  patientsController.get_single_patient
)
Router.delete(
  "/patients/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  patientsController.delete_patient
)
// doctors
Router.post(
  "/doctors",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  doctorsController.add_doctor
)
Router.get("/doctors", authMiddleware, doctorsController.get_doctors)
Router.put(
  "/doctors/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  doctorsController.edit_doctor
)
Router.delete(
  "/doctors/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  doctorsController.delete_doctor
)
// appointment
Router.post(
  "/appointments",
  authMiddleware,
  appointmentController.add_appointment
)
Router.delete(
  "/appointments/:id",
  authMiddleware,
  appointmentController.cancel_appointment
)
// prescription
Router.post(
  "/prescriptions",
  authMiddleware,

  roleMiddleware(Roles.Doctor),
  prescrpitionsController.add_prescrpition
)
Router.get(
  "/prescriptions/:id",
  authMiddleware,
  prescrpitionsController.get_single_prescription
)
Router.get(
  "/prescriptions/patients/:patientId",
  authMiddleware,
  prescrpitionsController.get_prescriptions
)
Router.put(
  "/prescriptions/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  prescrpitionsController.edit_prescription
)
Router.delete(
  "/prescriptions/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Doctor),
  prescrpitionsController.delete_prescription
)
export default Router
