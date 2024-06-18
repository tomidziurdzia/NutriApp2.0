import {
  DailyDietForm,
  DatePicker,
  MealList,
  ResumeNutrition,
} from "@/components";
import { Button } from "@/components/ui/button";
import usePatient from "@/hooks/usePatient";
import {
  CookingPot,
  Donut,
  EggFried,
  PlusCircle,
  Sandwich,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";

export const Diet = () => {
  const { dailyDiet, date } = usePatient();

  // const [date, setDate] = useState<Date | undefined>();

  const dailyDietFiltered = dailyDiet?.filter((dailyDiet) => {
    const dailyDate = (dailyDiet.date as unknown as string)?.split("T")[0];
    const dateFilter = moment(date).format().split("T")[0];
    return dailyDate === dateFilter;
  });

  // Inicializar variables para totales
  let totalKcal = 0;
  let totalProteins = 0;
  let totalCarbohydrates = 0;
  let totalFats = 0;

  // Iterar sobre los datos
  dailyDietFiltered?.forEach((entry) => {
    // Iterar sobre los alimentos de cada entrada (comida)
    entry.foods?.forEach((food) => {
      const {
        quantity,
        food: { kcal, proteins, carbohydrates, fats },
      } = food;
      // Sumar al total multiplicando quantity por cada propiedad y dividiendo por 100
      totalKcal += (quantity * kcal) / 100;
      totalProteins += (quantity * proteins) / 100;
      totalCarbohydrates += (quantity * carbohydrates) / 100;
      totalFats += (quantity * fats) / 100;
    });
  });

  const breakfast = dailyDietFiltered?.map((foods) =>
    foods.foods.filter((food) => food.dishType === "BREAKFAST")
  );

  const lunch = dailyDietFiltered?.map((foods) =>
    foods.foods.filter((food) => food.dishType === "LUNCH")
  );

  const dinner = dailyDietFiltered?.map((foods) =>
    foods.foods.filter((food) => food.dishType === "DINNER")
  );

  const snack = dailyDietFiltered?.map((foods) =>
    foods.foods.filter((food) => food.dishType === "SNACK")
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-md shadow-sm">
          <ResumeNutrition
            totalKcal={totalKcal}
            totalProteins={totalProteins}
            totalCarbohydrates={totalCarbohydrates}
            totalFats={totalFats}
          />
        </div>
        <div className="bg-white rounded-md shadow-sm flex p-4 flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-medium">Meals</span>
            <Button
              onClick={handleOpen}
              className="text-primary bg-white hover:bg-gray-200"
            >
              <PlusCircle className="w-8 h-8" strokeWidth={1.5} />
            </Button>
            <DatePicker />

            <DailyDietForm open={open} handleOpen={handleOpen} />
          </div>
          <div className="flex flex-col">
            <div className="border-b-2 p-2">
              <div className="flex w-1/3 justify-start gap-8 text-slate-500 items-center">
                <div className=" p-4 rounded-full bg-gray-200">
                  <EggFried className="w-6 h-6" />
                </div>
                <span className="text-xl">Breakfast</span>
              </div>
              {breakfast?.map((food) => (
                <MealList key={food.length} foodMeal={food} />
              ))}
            </div>

            <div className="border-b-2 p-2">
              <div className="flex w-1/3 justify-start gap-8 text-slate-500 items-center">
                <div className=" p-4 rounded-full bg-gray-200">
                  <Sandwich className="w-6 h-6" />
                </div>
                <span className="text-xl">Lunch</span>
              </div>
              {lunch?.map((food) => (
                <MealList key={food.length} foodMeal={food} />
              ))}
            </div>

            <div className="border-b-2 p-2">
              <div className="flex w-1/3 justify-start gap-8 text-slate-500 items-center">
                <div className=" p-4 rounded-full bg-gray-200">
                  <Donut className="w-6 h-6" />
                </div>
                <span className="text-xl">Snacks</span>
              </div>
              {snack?.map((food) => (
                <MealList key={food.length} foodMeal={food} />
              ))}
            </div>

            <div className="border-b-2 p-2">
              <div className="flex w-1/3 justify-start gap-8 text-slate-500 items-center">
                <div className=" p-4 rounded-full bg-gray-200">
                  <CookingPot className="w-6 h-6" />
                </div>
                <span className="text-xl">Dinner</span>
              </div>
              {dinner?.map((food) => (
                <MealList key={food.length} foodMeal={food} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
