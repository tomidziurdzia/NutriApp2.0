import { PatientForm } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDoctor from "@/hooks/useDoctor";
import { Pencil } from "lucide-react";

const Pacients = () => {
  const { patients } = useDoctor();

  return (
    <>
      <div className="p-2 w-full">
        <PatientForm />
      </div>
      <Table className="bg-white">
        <TableCaption>A list of your patients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/12">Name</TableHead>
            <TableHead className="w-3/12">Email</TableHead>
            <TableHead className="w-1/12 text-center">Kcal</TableHead>
            <TableHead className="w-1/12 text-center">Proteins</TableHead>
            <TableHead className="w-1/12 text-center">Carbohydrates</TableHead>
            <TableHead className="w-1/12 text-center">Fats</TableHead>
            <TableHead className="w-1/12 text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients?.map((pacient) => (
            <TableRow key={pacient.id} className="text-slate-400">
              <TableCell className="font-medium">
                {pacient.lastname + " " + pacient.name}
              </TableCell>
              <TableCell className="font-medium">{pacient.email}</TableCell>
              <TableCell className="font-medium text-center">
                {pacient.kcal}
              </TableCell>
              <TableCell className="font-medium text-center">
                {pacient.proteins}
              </TableCell>
              <TableCell className="font-medium text-center">
                {pacient.carbohydrates}
              </TableCell>
              <TableCell className="font-medium text-center">
                {pacient.fats}
              </TableCell>
              <TableCell className="font-medium">
                <Pencil strokeWidth={1} className="w-6 m-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Pacients;
