import { DailyDiet, DishType, Patient } from "@prisma/client";
import prisma from "../utils/prisma";
import moment from "moment";

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
  date: Date;
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
  patientId: string,
  dailyDate: Date
) => {
  const startOfDay = moment(dailyDate).format().split("T")[0];
  const existingDailyDiet = await prisma.dailyDiet.findFirst({
    where: {
      patientId: patientId,
      date: startOfDay,
    },
    include: {
      foods: true,
    },
  });

  if (existingDailyDiet) {
    return prisma.dailyDiet.update({
      where: {
        id: existingDailyDiet.id,
      },
      data: {
        date: startOfDay,
        foods: {
          upsert: daily.foods.map((food) => ({
            where: { id: food.foodId },
            update: {
              quantity: food.quantity,
              dishType: food.dishType,
              foodId: food.foodId,
              // Otros campos que necesites actualizar en FoodDosis
            },
            create: {
              quantity: food.quantity,
              dishType: food.dishType,
              foodId: food.foodId,
              // Otros campos que necesites crear en un nuevo FoodDosis
            },
          })),
        },
      },
      include: {
        // Incluir cualquier relación adicional que necesites devolver en el resultado
        foods: true, // Para devolver los alimentos actualizados
      },
    });
  } else {
    return prisma.dailyDiet.create({
      data: {
        patient: { connect: { id: patientId } },
        date: startOfDay,
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
  }
};

const deleteDosis = async (id: string, date: string) => {
  const filterByDate = await prisma.dailyDiet.findFirst({
    where: {
      date,
    },
    include: {
      foods: true,
    },
  });

  if (filterByDate) {
    return prisma.foodDosis.delete({
      where: {
        id,
      },
    });
  }
};

const getDaily = async (): Promise<DailyDiet[]> => {
  return prisma.dailyDiet.findMany({
    include: {
      foods: {
        include: {
          food: true,
        },
      },
    },
  });
};

const PatientModel = {
  getByEmail,
  addDaily,
  getDaily,
  deleteDosis,
};

export default PatientModel;
