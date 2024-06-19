import express from "express";
import checkDoctor from "../middleware/check-doctor";
import ChatController from "../controller/chat.controller";
import checkPatient from "../middleware/check-patient";

const router = express.Router();

router
  .route("/doctor/chat")
  .post(checkDoctor, ChatController.createChat)
  .get(checkDoctor, ChatController.getChat);

router.get(
  "/doctor/messages/:patientId",
  checkDoctor,
  ChatController.getMessages
);

router
  .route("/doctor/:patientId")
  .post(checkDoctor, ChatController.createMessageDoctor);

router
  .route("/patient/:patientId")
  .post(checkPatient, ChatController.createMessagePatient);
// .get(checkPatient, ChatController.get);

export default router;
