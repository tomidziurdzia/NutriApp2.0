import { NextFunction, Request, Response } from "express";
import {
  HttpStatusCode,
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from "../utils/response-handler";
import { Doctor, Patient } from "@prisma/client";
import DoctorModel from "../model/doctor.model";
import { comparePasswords } from "../utils/hash-password";
import { generateToken } from "../utils/generate-jwt";
import { RequestExt } from "../middleware/check-doctor";
import PatientModel from "../model/patient.model";

interface DoctorSignUp extends Doctor {
  repeatPassword: string;
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctor: DoctorSignUp = req.body;

    const { name, lastname, email, password, repeatPassword } = doctor;

    if (!name) throw new Error("Name cannot be empty");
    if (!lastname) throw new Error("Lastname cannot be empty");
    if (!email) throw new Error("Email cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (!repeatPassword) throw new Error("Repeat password cannot be empty");

    if (repeatPassword !== password) throw new Error("Passwords do not match");

    const doctorExist = await DoctorModel.getByEmail(email);
    if (doctorExist) throw new Error("Doctor already exist");

    const { repeatPassword: repeat, ...addDoctor } = doctor;

    await DoctorModel.create(addDoctor);
    return sendSuccessNoDataResponse(
      res,
      "Doctor created successfully",
      HttpStatusCode.CREATED
    );
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("Email cannot be empty");
    if (!password) throw new Error("Password cannot be empty");

    const doctorExist = await DoctorModel.getByEmail(email);
    if (!doctorExist) throw new Error("Doctor doesn't exist");

    const checkPassword = await comparePasswords(
      password,
      doctorExist.password
    );
    if (!checkPassword) throw new Error("The password is incorrect");
    const doctor = {
      id: doctorExist.id,
      name: doctorExist.name,
      lastname: doctorExist.lastname,
      email: doctorExist.email,
      role: doctorExist.role,
      token: generateToken({ id: doctorExist.id }, process.env.JWT_SECRET!),
    };

    sendSuccessResponse(res, doctor, HttpStatusCode.OK);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const doctor = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const doctor = req.doctor;
    sendSuccessResponse(res, doctor, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

const addPatient = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      carbohydrates,
      email,
      fats,
      kcal,
      lastname,
      name,
      password,
      proteins,
    }: Patient = req.body;

    console.log(req.body);

    if (!name) throw new Error("The name cannot be empty");
    if (!lastname) throw new Error("The lastname cannot be empty");
    if (!email) throw new Error("The email cannot be empty");
    if (!password) throw new Error("The password cannot be empty");
    if (!kcal) throw new Error("The kcal cannot be empty");
    if (!proteins) throw new Error("The proteins cannot be empty");
    if (!carbohydrates) throw new Error("The carbohydrates cannot be empty");
    if (!fats) throw new Error("The fats cannot be empty");

    const patientExist = await PatientModel.getByEmail(email);
    if (patientExist) throw new Error("Patient exist");

    const doctor = req.doctor;
    const doctorExist = await DoctorModel.getById(doctor?.id!);
    if (!doctorExist) throw new Error("Doctor doesn't exist");

    const newPatient = await DoctorModel.addPatient(req.body, doctorExist);

    const sendPatient = {
      id: newPatient.id,
      name: newPatient.name,
      lastname: newPatient.lastname,
      email: newPatient.email,
      kcal: newPatient.kcal,
      proteins: newPatient.proteins,
      carbohydrates: newPatient.carbohydrates,
      fats: newPatient.fats,
      role: newPatient.role,
    };

    return sendSuccessResponse(res, sendPatient, HttpStatusCode.CREATED);
  } catch (error: any) {
    sendErrorResponse(res, error.message, HttpStatusCode.BAD_REQUEST);
    next(error);
  }
};

const getPatients = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await DoctorModel.getPatients();
    return sendSuccessResponse(res, patients, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

const getFood = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const food = await DoctorModel.getFood();
    return sendSuccessResponse(res, food, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

const DoctorController = {
  signup,
  signin,
  doctor,
  addPatient,
  getPatients,
  getFood,
};

export default DoctorController;
