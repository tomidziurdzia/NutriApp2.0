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

const PatientService = {
  signin,
  patient,
};

export default PatientService;
