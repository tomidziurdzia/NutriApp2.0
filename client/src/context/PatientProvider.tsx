import { createContext, ReactNode, useEffect, useState } from "react";
import PatientService, {
  CreateDietDailyReponse,
  DailyDiet,
  Patient,
  PatientSignIn,
  PatientSignInResponse,
} from "../endpoints/patient.endpoint";
import { FoodList } from "@/components/DailyDietForm";

type PatientStatus = "authenticated" | "not-authenticated" | "loading";

interface PatientContextType {
  role?: string;
  status: PatientStatus;
  data?: PatientSignInResponse;
  dailyDiet?: DailyDiet[];
  patient?: Patient;
  signin: (patient: PatientSignIn) => Promise<PatientSignInResponse>;
  addDailyFood: (
    food: FoodList[]
  ) => Promise<CreateDietDailyReponse | undefined>;
}

const defaultContextValue: PatientContextType = {
  status: "loading",
  patient: {
    id: "",
    email: "",
    name: "",
    lastname: "",
    doctor: {
      name: "",
      lastname: "",
    },
    role: "",
    token: "",
    carbohydrates: 0,
    fats: 0,
    kcal: 0,
    proteins: 0,
  },
  signin: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  addDailyFood: () => {
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
  const [patient, setPatient] = useState<Patient>();
  const [dailyDiet, setDailyDiet] = useState<DailyDiet[]>([]);

  useEffect(() => {
    const authenticate = async () => {
      const patient = localStorage.getItem("token");
      if (!patient) return setStatus("not-authenticated");
      try {
        const data = await PatientService.patient();
        setData(data.data as unknown as PatientSignInResponse);
        setPatient(data.data);
        setRole(data.data?.role);
        setStatus("authenticated");
      } catch (error) {
        setData(undefined);
      }
    };

    authenticate();
  }, []);

  useEffect(() => {
    const getDaily = async () => {
      const dailyDiet = await PatientService.getDaily();
      setDailyDiet(dailyDiet.data);
    };

    getDaily();
  }, [dailyDiet.length]);

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

  const addDailyFood = async (food: FoodList[]) => {
    const data = await PatientService.createDailyFood(food);
    if (data.success) {
      setDailyDiet(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevDailyDiet) => [...prevDailyDiet, data.data?.foods] as any
      );
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
        patient,
        dailyDiet,
        addDailyFood,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;
