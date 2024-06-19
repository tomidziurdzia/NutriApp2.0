import { Chat, Message } from "@prisma/client";
import prisma from "../utils/prisma";

const createChat = async (
  patientId: string,
  doctorId: string
): Promise<Chat | null> => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (doctor && patient) {
    return await prisma.chat.create({
      data: {
        doctor: {
          connect: { ...doctor },
        },
        patient: {
          connect: { ...patient },
        },
      },
    });
  }

  return null;
};

const createMessageDoctor = async (
  text: string,
  doctorId: string,
  patientId: string,
  owner: string
): Promise<Message | null> => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  const chat = await prisma.chat.findFirst({
    where: {
      patientId,
    },
  });

  if (owner === "DOCTOR") {
    if (doctor && patient && chat) {
      return await prisma.message.create({
        data: {
          text,
          doctor: {
            connect: { ...doctor },
          },
          patient: {
            connect: { ...patient },
          },
          chat: {
            connect: { ...chat },
          },
          owner: "DOCTOR",
        },
      });
    }
  }

  // if (ownerDoctor)
  //   return await prisma.chat.create({
  //     data: {
  //       text,
  //       doctor: {
  //         connect: {
  //           ...ownerDoctor,
  //         },
  //       },
  //     },
  //   });

  // if (ownerPatient)
  //   return await prisma.chat.create({
  //     data: {
  //       text,
  //       patient: {
  //         connect: {
  //           ...ownerPatient,
  //         },
  //       },
  //     },
  //   });

  return null;
};

const createMessagePatient = async (
  text: string,
  patientId: string,
  owner: string
): Promise<Message | null> => {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { id: patient?.doctorId },
  });

  const chat = await prisma.chat.findFirst({
    where: {
      patientId,
    },
  });

  if (owner === "PATIENT") {
    if (doctor && patient && chat) {
      return await prisma.message.create({
        data: {
          text,
          doctor: {
            connect: { ...doctor },
          },
          patient: {
            connect: { ...patient },
          },
          chat: {
            connect: { ...chat },
          },
          owner: "PATIENT",
        },
      });
    }
  }

  // if (ownerDoctor)
  //   return await prisma.chat.create({
  //     data: {
  //       text,
  //       doctor: {
  //         connect: {
  //           ...ownerDoctor,
  //         },
  //       },
  //     },
  //   });

  // if (ownerPatient)
  //   return await prisma.chat.create({
  //     data: {
  //       text,
  //       patient: {
  //         connect: {
  //           ...ownerPatient,
  //         },
  //       },
  //     },
  //   });

  return null;
};

const getChat = async (): Promise<Chat[] | null> => {
  return await prisma.chat.findMany({
    include: {
      patient: {
        select: {
          name: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });
};

const getMessagesPatient = async (
  patientId: string
): Promise<Message[] | null> => {
  return await prisma.message.findMany({
    where: {
      patientId,
    },
    include: {
      patient: {
        select: { avatar: true },
      },
      doctor: {
        select: { avatar: true },
      },
    },
  });
};

const ChatModel = {
  createMessageDoctor,
  createChat,
  getChat,
  getMessagesPatient,
  createMessagePatient,
};

export default ChatModel;
