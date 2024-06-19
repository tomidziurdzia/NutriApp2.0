import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";

export interface IPatient {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface RequestExt extends Request {
  patient?: IPatient;
}

const checkPatient = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  let patientToken;
  const authorization = req.header("Authorization");

  if (!authorization)
    return res.status(401).json({ error: "Not token provided" });

  if (!authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "Invalid Bearer token" });

  try {
    patientToken = authorization.split(" ")[1];
    const decoded = jwt.verify(patientToken, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const decodedId = await Object.values(decoded)[0];

    if (!patientToken) {
      const error = new Error("Invalid patient");
      return res.status(401).json({ msg: error.message });
    }

    const findPatientData = await prisma.patient.findUnique({
      where: { id: decodedId },
      select: {
        email: true,
        id: true,
        name: true,
        lastname: true,
        carbohydrates: true,
        doctor: { select: { name: true, lastname: true } },
        fats: true,
        kcal: true,
        proteins: true,
        role: true,
        avatar: true,
      },
    });

    req.patient = findPatientData || undefined;
    return next();
  } catch (error) {
    return res.status(404).json({ msg: "There was an error", error });
  }
};

export default checkPatient;
