import express from "express";
import DoctorController from "../controller/doctor.controller";
import checkDoctor from "../middleware/check-doctor";

const router = express.Router();

router.post("/", DoctorController.signup);
router.post("/login", DoctorController.signin);
router.get("/check-doctor", checkDoctor, DoctorController.doctor);

router
  .route("/patient")
  .post(checkDoctor, DoctorController.addPatient)
  .get(checkDoctor, DoctorController.getPatients);

export default router;
