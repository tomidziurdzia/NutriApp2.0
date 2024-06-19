import { Doctor, Patient } from "@/context/DoctorProvider";
import clientAxios from "../config/clientAxios";
import { CreateChat } from "./chat.endpoint";

export interface DoctorSignUp {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface DoctorSignUpResponse {
  success: boolean;
  error?: { message: string };
  message?: string;
}

export interface DoctorSignIn {
  email: string;
  password: string;
}

export interface DoctorSignInResponse {
  success: boolean;
  data?: Doctor;
  error?: {
    message: string;
  };
}

export interface PatientsResponse {
  success: boolean;
  data?: Patient[];
}

export interface AddPatient {
  name: string;
  lastname: string;
  email: string;
  password: string;
  kcal: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

export interface AddPatientResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    kcal: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
    role: string;
    avatar: string;
  };
  error?: {
    message: string;
  };
}

export interface FoodResponse {
  success: boolean;
  data: Food[];
}

export interface Food {
  id: string;
  carbohydrates: number;
  category: string;
  fats: number;
  kcal: number;
  name: string;
  proteins: number;
}

export interface MessageResponse {
  success: boolean;
  data: Message[];
}

export interface Message {
  id: string;
  text: string;
  chatId: string;
  doctorId: string;
  patientId: string;
  createdAt: string;
  owner: string;
  patient: { avatar: string };
  doctor: { avatar: string };
}

const signup = async (doctor: DoctorSignUp): Promise<DoctorSignUpResponse> => {
  try {
    const { data } = await clientAxios.post("/doctor", doctor);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const signin = async (doctor: DoctorSignIn): Promise<DoctorSignInResponse> => {
  try {
    const { data } = await clientAxios.post("/doctor/login", doctor);
    localStorage.setItem("token", data.data!.token);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const doctor = async (): Promise<DoctorSignInResponse> => {
  try {
    const { data } = await clientAxios.get("/doctor/check-doctor");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const getPatients = async (): Promise<PatientsResponse> => {
  try {
    const { data } = await clientAxios.get("/doctor/patient");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const addPatient = async (patient: AddPatient): Promise<AddPatientResponse> => {
  try {
    const { data } = await clientAxios.post("/doctor/patient", patient);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const getFood = async (): Promise<FoodResponse> => {
  try {
    const { data } = await clientAxios.get("doctor/food");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const createChat = async (patientId: string): Promise<CreateChat> => {
  try {
    const { data } = await clientAxios.post("/chat/doctor/chat", { patientId });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const getMessagesPatient = async (
  patientId: string
): Promise<MessageResponse> => {
  try {
    const { data } = await clientAxios.get(
      `/chat/doctor/messages/${patientId}`
    );

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const DoctorService = {
  signup,
  signin,
  doctor,
  getPatients,
  addPatient,
  getFood,
  createChat,
  getMessagesPatient,
};

export default DoctorService;
