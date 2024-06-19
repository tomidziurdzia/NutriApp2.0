import { NextFunction, Request, Response } from "express";
import ChatModel from "../model/chat.model";
import {
  HttpStatusCode,
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/response-handler";
import { RequestExt } from "../middleware/check-doctor";

const createMessageDoctor = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;

    const { patientId } = req.params;
    const owner = req.url.split("/")[1].toUpperCase();

    const doctorId = req.doctor?.id;

    if (!doctorId) throw new Error("Doctor Id cannot be empty");

    const newChat = await ChatModel.createMessageDoctor(
      text,
      doctorId,
      patientId,
      owner
    );
    sendSuccessResponse(res, newChat, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const createMessagePatient = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;

    const { patientId } = req.params;
    const owner = req.url.split("/")[1].toUpperCase();

    const newChat = await ChatModel.createMessagePatient(
      text,
      patientId,
      owner
    );
    sendSuccessResponse(res, newChat, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const createChat = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId } = req.body;
    const doctorId = req.doctor?.id;

    if (!patientId) throw new Error("Patient Id cannot be empty");
    if (!doctorId) throw new Error("Doctor Id cannot be empty");

    const newChat = await ChatModel.createChat(patientId, doctorId);
    sendSuccessResponse(res, newChat, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const getChat = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const chats = await ChatModel.getChat();
    sendSuccessResponse(res, chats, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const getMessages = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId } = req.params;

    const newChat = await ChatModel.getMessagesPatient(patientId);
    sendSuccessResponse(res, newChat, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const ChatController = {
  createChat,
  createMessageDoctor,
  createMessagePatient,
  getChat,
  getMessages,
};

export default ChatController;
