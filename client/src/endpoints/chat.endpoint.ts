import clientAxios from "@/config/clientAxios";
import DoctorService from "./doctor.endpoint";
import PatientService from "./patient.endpoint";

export interface Chat {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    name: string;
    lastname: string;
    avatar: string;
  };
}

export interface ChatResponse {
  success: boolean;
  error?: { message: string };
  data?: Chat[];
}

export interface CreateChat {
  success: boolean;
  error?: { message: string };
  data?: {
    id: string;
    doctorId: string;
    patientId: string;
  };
}

export interface CreateMessage {
  success: string;
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

const getChat = async (): Promise<ChatResponse> => {
  try {
    const { data } = await clientAxios.get("/chat/doctor/chat");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const createMessage = async (
  text: string,
  patientId: string
): Promise<CreateMessage> => {
  try {
    const doctor = await DoctorService.doctor();
    const patient = await PatientService.patient();

    const owner = (doctor?.data && "doctor") || (patient?.data && "patient");

    const { data } = await clientAxios.post(`/chat/${owner}/${patientId}`, {
      text,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response?.data;
  }
};

const ChatService = {
  getChat,
  createMessage,
};

export default ChatService;
