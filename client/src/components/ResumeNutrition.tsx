import usePatient from "@/hooks/usePatient";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const ResumeNutrition = ({
  totalKcal,
  totalProteins,
  totalCarbohydrates,
  totalFats,
}: {
  totalKcal: number;
  totalProteins: number;
  totalCarbohydrates: number;
  totalFats: number;
}) => {
  const { patient } = usePatient();

  return (
    <>
      <div className="text-slate-500 w-2/3 m-auto p-4 flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">
              {patient?.kcal.toFixed(2)}
            </span>
            <span>Total</span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">
              {(patient!.kcal - totalKcal).toFixed(2)}
            </span>
            <span>Remaining</span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">
              {totalKcal.toFixed(2)}
            </span>
            <span>Consumed</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">Carbohydrates</span>
            <span>
              {totalCarbohydrates.toFixed(2)} /{" "}
              {patient?.carbohydrates.toFixed(2)}
              <Progress
                value={totalCarbohydrates}
                indicatorColor={cn({
                  "bg-red-500":
                    totalCarbohydrates > patient!.carbohydrates * 0.9,
                  "bg-yellow-500":
                    totalCarbohydrates >= patient!.carbohydrates * 0.6 &&
                    totalCarbohydrates < patient!.carbohydrates * 0.9,
                  "bg-green-500":
                    totalCarbohydrates <= patient!.carbohydrates * 0.6,
                })}
              />
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">Proteins</span>
            <span>
              {totalProteins.toFixed(2)} / {patient?.proteins.toFixed(2)}
              <Progress
                value={totalProteins}
                indicatorColor={cn({
                  "bg-red-500": totalProteins > patient!.proteins * 0.9,
                  "bg-yellow-500":
                    totalProteins >= patient!.proteins * 0.6 &&
                    totalProteins < patient!.proteins * 0.9,
                  "bg-green-500": totalProteins <= patient!.proteins * 0.6,
                })}
              />
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">Fats</span>
            <span>
              {totalFats.toFixed(2)} / {patient?.fats.toFixed(2)}
              <Progress
                value={totalFats}
                indicatorColor={cn({
                  "bg-red-500": totalFats > patient!.fats * 0.9,
                  "bg-yellow-500":
                    totalFats >= patient!.fats * 0.6 &&
                    totalFats < patient!.fats * 0.9,
                  "bg-green-500": totalFats <= patient!.fats * 0.6,
                })}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeNutrition;
