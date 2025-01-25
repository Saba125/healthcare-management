import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
import roleMiddleware from "../middlewares/permission"
import { Roles } from "@prisma/client"
import patientsController from "../controllers/patients/export"
import doctorsController from "../controllers/doctors/export"
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

export default Router
