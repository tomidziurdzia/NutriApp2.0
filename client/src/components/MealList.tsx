import { Foods } from "@/endpoints/patient.endpoint";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CircleX } from "lucide-react";
import usePatient from "@/hooks/usePatient";

const MealList = ({ foodMeal }: { foodMeal: Foods[] }) => {
  const { date, deleteDosis } = usePatient();
  // Variables para almacenar totales
  const totalKcal = foodMeal
    .map((food) => (food.quantity * food.food.kcal) / 100)
    .reduce((acc, current) => acc + current, 0);

  const totalProteins = foodMeal
    .map((food) => (food.quantity * food.food.proteins) / 100)
    .reduce((acc, current) => acc + current, 0);

  const totalCarbohydrates = foodMeal
    .map((food) => (food.quantity * food.food.carbohydrates) / 100)
    .reduce((acc, current) => acc + current, 0);

  const totalFats = foodMeal
    .map((food) => (food.quantity * food.food.fats) / 100)
    .reduce((acc, current) => acc + current, 0);

  const handleDelete = async (id: string) => {
    await deleteDosis(id, date as unknown as string);
  };

  return (
    <>
      {foodMeal.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Quantity (Gr)</TableHead>
              <TableHead className="text-center">Calories</TableHead>
              <TableHead className="text-center">Proteins</TableHead>
              <TableHead className="text-center">Carbohydrates</TableHead>
              <TableHead className="text-center">Fats</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodMeal.map((food) => (
              <TableRow key={food.id}>
                <TableCell className="capitalize">{food.food.name}</TableCell>
                <TableCell className="capitalize">
                  {food.food.category}
                </TableCell>
                <TableCell className="text-center">{food.quantity}</TableCell>
                <TableCell className="text-center">
                  {((food.quantity * food.food.kcal) / 100).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {((food.quantity * food.food.proteins) / 100).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {((food.quantity * food.food.carbohydrates) / 100).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {((food.quantity * food.food.fats) / 100).toFixed(2)}
                </TableCell>
                <TableCell>
                  <button
                    className="rounded-full"
                    onClick={() => handleDelete(food.id)}
                  >
                    <CircleX className="text-red-500" strokeWidth={1} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="text-center">
                {totalKcal.toFixed(2)}
              </TableHead>
              <TableHead className="text-center">
                {totalProteins.toFixed(2)}
              </TableHead>
              <TableHead className="text-center">
                {totalCarbohydrates.toFixed(2)}
              </TableHead>
              <TableHead className="text-center">
                {totalFats.toFixed(2)}
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
};

export default MealList;
