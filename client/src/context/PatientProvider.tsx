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
  date: Date;
  role?: string;
  status: PatientStatus;
  data?: PatientSignInResponse;
  dailyDiet?: DailyDiet[];
  patient?: Patient;
  signin: (patient: PatientSignIn) => Promise<PatientSignInResponse>;
  addDailyFood: (
    food: FoodList[]
  ) => Promise<CreateDietDailyReponse | undefined>;
  setDatePicker: (date: Date) => void;
  deleteDosis: (id: string, date: string) => void;
}

const defaultContextValue: PatientContextType = {
  date: new Date(),
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
    avatar: "",
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
  setDatePicker: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  deleteDosis: () => {
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

  const [date, setDate] = useState<Date>(new Date());

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
  }, [dailyDiet?.length]);

  const signin = async (patient: PatientSignIn) => {
    const data = await PatientService.signin(patient);

    if (data.success) {
      setData(data.data as unknown as PatientSignInResponse);
      setStatus("authenticated");
      setRole(data.data?.role);
      return data;
    } else {
      setData(data);
      return data;
    }
  };

  const addDailyFood = async (food: FoodList[]) => {
    const data = await PatientService.createDailyFood(food, date);
    if (data.success) {
      setDailyDiet(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevDailyDiet) => [...prevDailyDiet, data.data?.foods] as any
      );
      return data;
    }
  };

  const setDatePicker = (date: Date) => {
    setDate(date);
  };

  const deleteDosis = async (id: string, date: string) => {
    await PatientService.deleteFoodDosis(id, date);

    const getDaily = async () => {
      const dailyDiet = await PatientService.getDaily();
      setDailyDiet(dailyDiet.data);
    };

    getDaily();
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
        date,
        setDatePicker,
        deleteDosis,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;
