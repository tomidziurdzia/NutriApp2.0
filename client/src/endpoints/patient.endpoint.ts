import { FoodList } from "@/components/DailyDietForm";
import clientAxios from "../config/clientAxios";

export interface PatientSignIn {
  email: string;
  password: string;
}

export interface Patient {
  id: string;
  email: string;
  name: string;
  lastname: string;
  doctor: { name: string; lastname: string };
  role: string;
  token: string;
  carbohydrates: number;
  fats: number;
  kcal: number;
  proteins: number;
}

export interface PatientSignInResponse {
  success: boolean;
  data?: Patient;
  error?: {
    message: string;
  };
}

export interface DietDailyResponse {
  success: boolean;
  data: DailyDiet[];
}

export interface CreateDietDailyReponse {
  success: boolean;
  data?: {
    date: Date;
    foods: Foods[];
    id: string;
    patientId: string;
  };
}

export interface DailyDiet {
  date: Date;
  foods: Foods[];
}

export interface Foods {
  id: string;
  quantity: number;
  dishType: string;
  dailyDietId: string;
  foodId: string;
  food: {
    name: string;
    category: string;
    carbohydrates: number;
    fats: number;
    proteins: number;
    kcal: number;
  };
}

const signin = async (
  doctor: PatientSignIn
): Promise<PatientSignInResponse> => {
  try {
    const { data } = await clientAxios.post("/patient/login", doctor);
    localStorage.setItem("token", data.data!.token);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

const patient = async (): Promise<PatientSignInResponse> => {
  try {
    const { data } = await clientAxios.get("/patient/check-patient");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

const getDaily = async (): Promise<DietDailyResponse> => {
  try {
    const { data } = await clientAxios.get("/patient/daily");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

const createDailyFood = async (
  daily: FoodList[],
  date: Date
): Promise<CreateDietDailyReponse> => {
  const foods = [...daily];
  try {
    const { data } = await clientAxios.post("/patient/daily", { foods, date });

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteFoodDosis = async (id: string, date: string): Promise<void> => {
  try {
    const { data } = await clientAxios.delete(`/patient/daily/${id}/${date}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

const PatientService = {
  signin,
  patient,
  getDaily,
  createDailyFood,
  deleteFoodDosis,
};

export default PatientService;
