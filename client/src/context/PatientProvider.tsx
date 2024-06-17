import { createContext, ReactNode, useEffect, useState } from "react";
import PatientService, {
  PatientSignIn,
  PatientSignInResponse,
} from "../endpoints/patient.endpoint";

type PatientStatus = "authenticated" | "not-authenticated" | "loading";

interface PatientContextType {
  role?: string;
  status: PatientStatus;
  data?: PatientSignInResponse;
  signin: (patient: PatientSignIn) => Promise<PatientSignInResponse>;
}

const defaultContextValue: PatientContextType = {
  status: "loading",
  signin: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
};

const PatientContext = createContext<PatientContextType>(defaultContextValue);

const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<PatientStatus>("loading");
  const [data, setData] = useState<PatientSignInResponse>();
  const [role, setRole] = useState<string | undefined>("");

  useEffect(() => {
    const authenticate = async () => {
      const patient = localStorage.getItem("token");
      if (!patient) return setStatus("not-authenticated");
      try {
        const data = await PatientService.patient();
        setData(data.data as unknown as PatientSignInResponse);
        setRole(data.data?.role);
        setStatus("authenticated");
      } catch (error) {
        setData(undefined);
      }
    };

    authenticate();
  }, []);

  const signin = async (patient: PatientSignIn) => {
    const data = await PatientService.signin(patient);

    if (data.success) {
      setData(data.data as unknown as PatientSignInResponse);
      setRole(data.data?.role);
      setStatus("authenticated");
      return data;
    } else {
      setData(data);
      return data;
    }
  };

  return (
    <PatientContext.Provider
      value={{
        status,
        signin,
        data,
        role,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;
