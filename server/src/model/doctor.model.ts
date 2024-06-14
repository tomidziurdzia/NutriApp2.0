import { Doctor, Patient } from "@prisma/client";
import prisma from "../utils/prisma";
import { hashPassword } from "../utils/hash-password";

const create = async (doctor: Doctor): Promise<Doctor> => {
  return prisma.doctor.create({
    data: {
      ...doctor,
      password: await hashPassword(doctor.password),
    },
  });
};

const getByEmail = async (email: string): Promise<Doctor | null> => {
  return prisma.doctor.findUnique({ where: { email } });
};

const getById = async (id: string): Promise<Doctor | null> => {
  return prisma.doctor.findUnique({ where: { id } });
};

const addPatient = async (
  patient: Patient,
  doctor: Doctor
): Promise<Patient> => {
  console.log(patient);
  return prisma.patient.create({
    data: {
      ...patient,
      password: await hashPassword(patient.password),
      doctorId: doctor.id,
    },
  });
};

const getPatients = async () => {
  const patients = await prisma.patient.findMany({
    select: {
      carbohydrates: true,
      email: true,
      fats: true,
      id: true,
      kcal: true,
      name: true,
      lastname: true,
      proteins: true,
      role: true,
    },
  });

  return patients;
};

const DoctorModel = {
  create,
  getByEmail,
  getById,
  addPatient,
  getPatients,
};

export default DoctorModel;
