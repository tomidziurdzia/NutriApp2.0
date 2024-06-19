import { createContext, ReactNode, useEffect, useState } from "react";
import DoctorService, {
  AddPatient,
  AddPatientResponse,
  DoctorSignIn,
  DoctorSignInResponse,
  DoctorSignUp,
  DoctorSignUpResponse,
  Message,
} from "../endpoints/doctor.endpoint";
import ChatService, { Chat, CreateChat } from "@/endpoints/chat.endpoint";

type DoctorStatus = "authenticated" | "not-authenticated" | "loading";

export interface Doctor {
  email: string;
  id: string;
  name: string;
  lastname: string;
  role: string;
  avatar: string;
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
  avatar: string;
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
  chat?: Chat[];
  messages?: Message[];
  status: DoctorStatus;
  data?: DoctorSignUpResponse | DoctorSignInResponse;
  doctor?: Doctor;
  patients: Patient[];
  signup: (doctor: DoctorSignUp) => Promise<DoctorSignUpResponse>;
  signin: (doctor: DoctorSignIn) => Promise<DoctorSignInResponse>;
  addPatient: (patient: AddPatient) => Promise<AddPatientResponse>;
  getMessages: (patientId: string) => Promise<void>;
  logout: () => void;
  createChat: (patientId: string) => Promise<CreateChat | undefined>;
  createMessage: (text: string, patientId: string) => void;
}

const defaultContextValue: DoctorContextType = {
  food: [],
  messages: [],
  chat: [],
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
  logout: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  createChat: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  getMessages: () => {
    throw new Error(
      "tried to use watch list context but there is not provider"
    );
  },
  createMessage: () => {
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

  const [chat, setChat] = useState<Chat[] | undefined>([]);
  const [messages, setMessages] = useState<Message[] | undefined>([]);

  useEffect(() => {
    const getChat = async () => {
      const chat = await ChatService.getChat();
      setChat(chat.data);
    };

    getChat();
  }, [chat?.length]);

  const getMessages = async (patientId: string) => {
    const data = await DoctorService.getMessagesPatient(patientId);

    if (data.success) {
      setMessages(data.data);
    }
  };

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
      setFood(fetchedFood.data!);
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

  const logout = () => {
    localStorage.clear();
  };

  const createChat = async (patientId: string) => {
    const data = await DoctorService.createChat(patientId);

    if (data.success) {
      setChat((prevChat) => [...prevChat!, data.data] as Chat[]);
      return data;
    }
  };

  const createMessage = async (text: string, patientId: string) => {
    await ChatService.createMessage(text, patientId);
    await getMessages(patientId);
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
        logout,
        createChat,
        chat,
        messages,
        getMessages,
        createMessage,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export { DoctorProvider };
export default DoctorContext;
