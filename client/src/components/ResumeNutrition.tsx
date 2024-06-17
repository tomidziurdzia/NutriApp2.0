import usePatient from "@/hooks/usePatient";

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
            <span className="font-semibold text-xl">{patient?.kcal}</span>
            <span>Total</span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">
              {patient!.kcal - totalKcal}
            </span>
            <span>Remaining</span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">{totalKcal}</span>
            <span>Consumed</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">Carbohydrates</span>
            <span>
              {totalCarbohydrates.toFixed(2)} /{" "}
              {patient?.carbohydrates.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">Proteins</span>
            <span>
              {totalProteins.toFixed(2)} / {patient?.proteins.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-40">
            <span className="font-semibold text-xl">Fats</span>
            <span>
              {totalFats.toFixed(2)} / {patient?.fats.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeNutrition;
