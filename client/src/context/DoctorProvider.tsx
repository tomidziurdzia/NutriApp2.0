import { createContext, ReactNode, useEffect, useState } from "react";
import DoctorService, {
  AddPatient,
  AddPatientResponse,
  DoctorSignIn,
  DoctorSignInResponse,
  DoctorSignUp,
  DoctorSignUpResponse,
} from "../endpoints/doctor.endpoint";

type DoctorStatus = "authenticated" | "not-authenticated" | "loading";

export interface Doctor {
  email: string;
  id: string;
  name: string;
  lastname: string;
  role: string;
}

export interface Patient {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  kcal: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  kcal: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

interface DoctorContextType {
  role?: string;
  food: Food[];
  status: DoctorStatus;
  data?: DoctorSignUpResponse | DoctorSignInResponse;
  doctor?: Doctor;
  patients: Patient[];
  signup: (doctor: DoctorSignUp) => Promise<DoctorSignUpResponse>;
  signin: (doctor: DoctorSignIn) => Promise<DoctorSignInResponse>;
  addPatient: (patient: AddPatient) => Promise<AddPatientResponse>;
}

const defaultContextValue: DoctorContextType = {
  food: [],
  patients: [],
  status: "loading",
  signup: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  signin: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  addPatient: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
};

const DoctorContext = createContext<DoctorContextType>(defaultContextValue);

const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<DoctorStatus>("loading");
  const [data, setData] = useState<DoctorSignUpResponse>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [food, setFood] = useState<Food[]>([]);
  const [role, setRole] = useState<string | undefined>("");

  useEffect(() => {
    const authenticate = async () => {
      const doctor = localStorage.getItem("token");
      if (!doctor) return setStatus("not-authenticated");
      try {
        const data = await DoctorService.doctor();
        setDoctor(data.data);
        setRole(data.data?.role);
        setStatus("authenticated");
      } catch (error) {
        setData(undefined);
      }
    };

    authenticate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedPatients, fetchedFood] = await Promise.all([
        DoctorService.getPatients(),
        DoctorService.getFood(),
      ]);
      setPatients(fetchedPatients.data!);
      setFood(fetchedFood.data);
    };

    fetchData();
  }, []);

  const signup = async (doctor: DoctorSignUp) => {
    const data = await DoctorService.signup(doctor);

    if (data.success) {
      setData(data);
      return data;
    } else {
      setData(data);
      return data;
    }
  };

  const signin = async (doctor: DoctorSignIn) => {
    const data = await DoctorService.signin(doctor);

    if (data.success) {
      setData(data.data as unknown as DoctorSignInResponse);
      setStatus("authenticated");
      setRole(data.data?.role);
      return data;
    } else {
      setData(data);
      return data;
    }
  };

  const addPatient = async (patient: AddPatient) => {
    const data = await DoctorService.addPatient(patient);
    if (data.success) {
      setPatients((prevPatients) => [...prevPatients, data.data] as Patient[]);
      return data;
    } else {
      setData(data);
      return data;
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        status,
        signup,
        data,
        signin,
        doctor,
        patients,
        addPatient,
        role,
        food,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export { DoctorProvider };
export default DoctorContext;
