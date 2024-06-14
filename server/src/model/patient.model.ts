import { DailyDiet, DishType, Patient } from "@prisma/client";
import prisma from "../utils/prisma";

interface DoctorResponse {
  name: string;
  lastname: string;
}

interface PatientReponse {
  email: string;
  id: string;
  name: string;
  lastname: string;
  doctor: DoctorResponse;
  carbohydrates: number;
  fats: number;
  kcal: number;
  proteins: number;
  role: string;
  password: string;
}

export interface DailyDietInput {
  foods: FoodDosisInput[];
  patientId: string;
}

interface FoodDosisInput {
  foodId: string;
  quantity: number;
  dishType: DishType;
}

const getByEmail = async (email: string): Promise<PatientReponse | null> => {
  return prisma.patient.findUnique({
    where: { email },
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
      password: true,
    },
  });
};

const addDaily = async (
  daily: DailyDietInput,
  patientId: string
): Promise<DailyDiet> => {
  return prisma.dailyDiet.create({
    data: {
      patient: { connect: { id: patientId } },
      foods: {
        create: daily.foods.map((foodDosis) => ({
          food: {
            connect: { id: foodDosis.foodId },
          },
          quantity: foodDosis.quantity,
          dishType: foodDosis.dishType,
        })),
      },
    },
    include: {
      foods: true,
    },
  });
};

const getDaily = async (): Promise<DailyDiet[]> => {
  return prisma.dailyDiet.findMany({
    include: {
      foods: true,
    },
  });
};

const PatientModel = {
  getByEmail,
  addDaily,
  getDaily,
};

export default PatientModel;
