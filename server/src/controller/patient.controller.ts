import { NextFunction, Request, Response } from "express";
import {
  HttpStatusCode,
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/response-handler";
import { comparePasswords } from "../utils/hash-password";
import { generateToken } from "../utils/generate-jwt";
import PatientModel, { DailyDietInput } from "../model/patient.model";
import { RequestExt } from "../middleware/check-patient";
import moment from "moment";

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("Email cannot be empty");
    if (!password) throw new Error("Password cannot be empty");

    const patientExist = await PatientModel.getByEmail(email);
    if (!patientExist) throw new Error("User doesn't exist");

    const checkPassword = await comparePasswords(
      password,
      patientExist.password
    );
    if (!checkPassword) throw new Error("The password is incorrect");

    const addPatientToken = {
      ...patientExist,
      token: generateToken({ id: patientExist.id }, process.env.JWT_SECRET!),
    };

    const { password: pass, ...patient } = addPatientToken;

    sendSuccessResponse(res, patient, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const patient = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const patient = req.patient;
    sendSuccessResponse(res, patient, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

const daily = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const patient = req.patient;

    const daily: DailyDietInput = req.body;
    const { date, ...rest } = daily;

    const dateSelected = moment(daily.date).format();

    const data = await PatientModel.addDaily(
      daily,
      patient?.id!,
      dateSelected as unknown as Date
    );

    sendSuccessResponse(res, data, HttpStatusCode.CREATED);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const getDaily = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const data = await PatientModel.getDaily();
    sendSuccessResponse(res, data, HttpStatusCode.CREATED);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const deleteFoodDosis = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  const { id, date } = req.params;

  const resetDate = moment(date).format().split("T")[0];

  try {
    const data = await PatientModel.deleteDosis(id, resetDate);
    console.log(data);
    sendSuccessNoDataResponse(res, "Deleted Succesfully", HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const PatientController = {
  signin,
  patient,
  daily,
  getDaily,
  deleteFoodDosis,
};

export default PatientController;
