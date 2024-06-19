import usePatient from "@/hooks/usePatient";
import moment from "moment";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface Day {
  date: string;
  isCurrentMonth: boolean;
  data: [];
}

const DayCalendar = ({ day }: { day: Day }) => {
  const { patient } = usePatient();
  // Inicializar variables para totales
  let totalKcal = 0;
  let totalProteins = 0;
  let totalCarbohydrates = 0;
  let totalFats = 0;

  day.data?.forEach((food) => {
    // Iterar sobre los alimentos de cada entrada (comida)
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

  const today = moment(new Date()).date();

  return (
    <div
      key={day.date}
      className={classNames(
        day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
        "relative px-3 py-2"
      )}
    >
      <time
        dateTime={day.date}
        className={
          day.date.split("-")[2] === today.toString()
            ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
            : undefined
        }
      >
        {day.date?.split("-").pop()?.replace(/^0/, "")}
      </time>
      {day.data?.length > 0 && (
        <ol className="mt-2">
          <li className="flex justify-between">
            <span>Calories</span>{" "}
            <span>
              {totalKcal.toFixed(2)}{" "}
              <span className="lg:hidden"> / {patient?.kcal.toFixed(2)}</span>
            </span>
          </li>
          <li className="flex justify-between">
            <span>Proteins</span>{" "}
            <span>
              {totalProteins.toFixed(2)}{" "}
              <span className="lg:hidden">
                / {patient?.proteins.toFixed(2)}
              </span>
            </span>
          </li>
          <li className="flex justify-between">
            <span>Carbs</span>{" "}
            <span>
              {totalCarbohydrates.toFixed(2)}{" "}
              <span className="lg:hidden">
                / {totalCarbohydrates.toFixed(2)}
              </span>
            </span>
          </li>
          <li className="flex justify-between">
            <span>Fats</span>{" "}
            <span>
              {totalFats.toFixed(2)}{" "}
              <span className="lg:hidden">/ {totalFats.toFixed(2)}</span>
            </span>
          </li>
        </ol>
      )}
    </div>
  );
};

export default DayCalendar;
