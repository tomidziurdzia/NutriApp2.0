import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";
import { IPatient } from "./check-patient";

interface IDoctor {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface RequestExt extends Request {
  doctor?: IDoctor;
  patient?: IPatient;
}

const checkDoctor = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  let doctorToken;
  const authorization = req.header("Authorization");

  if (!authorization)
    return res.status(401).json({ error: "Not token provided" });

  if (!authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "Invalid Bearer token" });

  try {
    doctorToken = authorization.split(" ")[1];
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const decodedId = await Object.values(decoded)[0];

    if (!doctorToken) {
      const error = new Error("Invalid doctor");
      return res.status(401).json({ msg: error.message });
    }

    const findDoctorData = await prisma.doctor.findUnique({
      where: { id: decodedId },
      select: {
        email: true,
        id: true,
        name: true,
        lastname: true,
        role: true,
        avatar: true,
      },
    });

    req.doctor = findDoctorData || undefined;
    return next();
  } catch (error) {
    return res.status(404).json({ msg: "There was an error", error });
  }
};

export default checkDoctor;
