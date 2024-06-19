import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDoctor from "@/hooks/useDoctor";
import { Chat } from "@/endpoints/chat.endpoint";

const NewChatForm = ({ chat }: { chat: Chat[] | undefined }) => {
  const [patientId, setPatientId] = useState("");
  const [open, setOpen] = useState(false);

  const { patients, createChat } = useDoctor();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await createChat(patientId);

    if (data?.success) {
      setOpen(!open);
      setPatientId("");
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setPatientId("");
  };

  // Obtener los IDs de cada array
  const idsArray1 = patients?.map((patient) => patient.id);
  const idsArray2 = chat?.map((ch) => ch.patientId);

  // Encontrar IDs en array1 que no están en array2
  const missingIds = idsArray1?.filter(
    (patientId) => !idsArray2?.includes(patientId)
  );

  // Filtrar pacientes en array1 que corresponden a los IDs faltantes
  const missingPatients = patients?.filter((patient) =>
    missingIds?.includes(patient.id)
  );

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="text-white hover:bg-primary-foreground">
          New Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a new patient</DialogTitle>
        <DialogDescription>Complete the form and send it.</DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block" htmlFor="category">
                Category
              </label>
              <select
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="category"
                id="category"
                value={patientId}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
                {missingPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} {patient.lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter className="w-full flex justify-center">
            <Button
              className="text-white w-2/3 mx-auto hover:bg-primary-foreground"
              type="submit"
            >
              Add patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatForm;
