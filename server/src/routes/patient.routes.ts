import express from "express";
import checkPatient from "../middleware/check-patient";
import PatientController from "../controller/patient.controller";

const router = express.Router();

router.post("/login", PatientController.signin);
router.get("/check-patient", checkPatient, PatientController.patient);

router
  .route("/daily")
  .post(checkPatient, PatientController.daily)
  .get(checkPatient, PatientController.getDaily);

export default router;
