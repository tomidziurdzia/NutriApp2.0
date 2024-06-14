import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePatient from "@/hooks/usePatient";

const Food = () => {
  // const { food } = usePatient();

  return (
    <Table>
      <TableCaption>A list of food.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-center">Calories (100Gr)</TableHead>
          <TableHead className="text-center">Proteins</TableHead>
          <TableHead className="text-center">Carbohydrates</TableHead>
          <TableHead className="text-center">Fats</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {food?.map((data) => (
          <TableRow key={data.id} className="text-slate-400">
            <TableCell className="capitalize">{data.name}</TableCell>
            <TableCell className="capitalize">{data.category}</TableCell>
            <TableCell className="capitalize text-center">
              {data.kcal}
            </TableCell>
            <TableCell className="capitalize text-center">
              {data.proteins}
            </TableCell>
            <TableCell className="capitalize text-center">
              {data.carbohydrates}
            </TableCell>
            <TableCell className="capitalize text-center">
              {data.fats}
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default Food;
