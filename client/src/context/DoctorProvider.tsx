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

interface Doctor {
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

interface DoctorContextType {
  status: DoctorStatus;
  data?: DoctorSignUpResponse | DoctorSignInResponse;
  doctor?: Doctor;
  patients: Patient[];
  signup: (doctor: DoctorSignUp) => Promise<DoctorSignUpResponse>;
  signin: (doctor: DoctorSignIn) => Promise<DoctorSignInResponse>;
  addPatient: (patient: AddPatient) => Promise<AddPatientResponse>;
}

const defaultContextValue: DoctorContextType = {
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

  useEffect(() => {
    const authenticate = async () => {
      const doctor = localStorage.getItem("token");
      if (!doctor) return setStatus("not-authenticated");
      try {
        const data = await DoctorService.doctor();
        setDoctor(data.data);
        setStatus("authenticated");
      } catch (error) {
        setData(undefined);
      }
    };

    authenticate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPatients = await DoctorService.getPatients();
      setPatients(fetchedPatients.data!);
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
    const data = await DoctorService.singin(doctor);

    if (data.success) {
      setData(data.data as unknown as DoctorSignInResponse);
      setStatus("authenticated");
      localStorage.setItem("token", data.data!.token);
      return data;
    } else {
      setData(data as unknown as DoctorSignInResponse);
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
      value={{ status, signup, data, signin, doctor, patients, addPatient }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export { DoctorProvider };
export default DoctorContext;
