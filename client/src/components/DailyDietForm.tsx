import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useDoctor from "@/hooks/useDoctor";
import usePatient from "@/hooks/usePatient";
import { Button } from "./ui/button";

export interface FoodList {
  foodId: string;
  quantity: number;
  dishType: string;
}

const DailyDietForm = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: (arg0: boolean) => void;
}) => {
  const { food } = useDoctor();

  const { addDailyFood } = usePatient();

  const [values, setValues] = useState({
    dishType: "",
    category: "",
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<FoodList[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      // Añadir el valor del checkbox al estado si es seleccionado
      setSelectedCheckboxes([
        ...selectedCheckboxes,
        { foodId: value, quantity: 0, dishType: values.dishType },
      ]);
    } else {
      // Remover el valor del checkbox del estado si es deseleccionado
      setSelectedCheckboxes(
        selectedCheckboxes?.filter((checkbox) => checkbox.foodId !== value)
      );
    }
  };

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const quantity = e.target.value;
    setSelectedCheckboxes(
      selectedCheckboxes.map((item) => {
        return item.foodId === id
          ? { ...item, quantity: Number(quantity) }
          : item;
      })
    );
  };

  const DISH_TYPE = ["BREAKFAST", "LUNCH", "SNACK", "DINNER"];
  const CATEGORY = [
    "meats",
    "charcuterie",
    "dairy",
    "legumes",
    "flour",
    "fruits",
    "vegetables",
  ];

  const foodFilterByCategory = food.filter(
    (food) => food.category === values.category.toLowerCase()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setSelectedCheckboxes([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await addDailyFood(selectedCheckboxes);

    if (data?.success) {
      handleOpen(!open);
      setValues({ category: "", dishType: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a new daily food</DialogTitle>
        <DialogDescription>Complete the form and send it.</DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block " htmlFor="name">
                Dish Type
              </label>
              <select
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="dishType"
                id="dishType"
                value={values.dishType}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
                {DISH_TYPE.map((dishType) => (
                  <option key={dishType} value={dishType}>
                    {dishType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-2 flex-1">
              <label className="block" htmlFor="category">
                Category
              </label>
              <select
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="category"
                id="category"
                value={values.category}
                onChange={handleChange}
              >
                <option value="">- Select -</option>
                {CATEGORY.map((category) => (
                  <option key={category} value={category}>
                    {category.toLocaleUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-2 flex-1 flex flex-col gap-2">
              <div className="flex justify-between">
                <label className="block" htmlFor="food">
                  Food
                </label>
                <label>Quantity</label>
              </div>

              {foodFilterByCategory.map((food) => (
                <div className="flex justify-between" key={food.id}>
                  <label className="flex gap-2">
                    <input
                      value={food.id}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    {food.name.toLocaleUpperCase()}
                  </label>
                  <span>
                    <input
                      onChange={(e) => handleChangeQuantity(e, food.id)}
                      type="number"
                      className="bg-gray-200 w-14"
                    />{" "}
                    Gr
                  </span>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="w-full flex justify-center">
            <Button
              className="text-white w-2/3 mx-auto hover:bg-primary-foreground"
              type="submit"
            >
              Add Food
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DailyDietForm;
