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
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { AlertTitle } from "@/components/ui/alert.tsx";

const PatientForm = () => {
  const { addPatient, data } = useDoctor();
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    kcal: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(!open);
    setValues({
      name: "",
      lastname: "",
      email: "",
      password: "",
      kcal: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const addPacient = {
      ...values,
      kcal: Number(values.fats),
      proteins: Number(values.proteins),
      carbohydrates: Number(values.carbohydrates),
      fats: Number(values.fats),
    };
    const data = await addPatient(addPacient);

    if (data.success) {
      setOpen(false);
    }

    setValues({
      name: "",
      lastname: "",
      email: "",
      password: "",
      kcal: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="text-white hover:bg-primary-foreground">
          Add patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a new patient</DialogTitle>
        <DialogDescription>Complete the form and send it.</DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Tomas"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="lastname">
                Lastname
              </label>
              <input
                type="text"
                placeholder="Dziurdzia"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="lastname"
                id="lastname"
                value={values.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="tomidziurdzia@gmail.com"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="***********"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="kcal">
                Kcal
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="kcal"
                id="kcal"
                value={values.kcal}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="proteins">
                Proteins
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="proteins"
                id="proteins"
                value={values.proteins}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="carbohydrates">
                Carbohydrates
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="carbohydrates"
                id="carbohydrates"
                value={values.carbohydrates}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="fats">
                Fats
              </label>
              <input
                type="number"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="fats"
                id="fats"
                value={values.fats}
                onChange={handleChange}
              />
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
        {data?.error?.message && (
          <Alert variant="destructive" className="bg-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alert!</AlertTitle>
            <AlertDescription>{data?.error?.message}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;
