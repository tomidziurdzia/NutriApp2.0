import moment from "moment";
import DayCalendar, { Day } from "./DayCalendar";
import usePatient from "@/hooks/usePatient";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = [
  { date: "2024-05-27", data: [] },
  { date: "2024-05-28", data: [] },
  { date: "2024-05-29", data: [] },
  { date: "2024-05-30", data: [] },
  { date: "2024-05-31", data: [] },
  { date: "2024-06-01", isCurrentMonth: true, data: [] },
  { date: "2024-06-02", isCurrentMonth: true, data: [] },
  { date: "2024-06-03", isCurrentMonth: true, data: [] },
  { date: "2024-06-04", isCurrentMonth: true, data: [] },
  { date: "2024-06-05", isCurrentMonth: true, data: [] },
  { date: "2024-06-06", isCurrentMonth: true, data: [] },
  { date: "2024-06-07", isCurrentMonth: true, data: [] },
  { date: "2024-06-08", isCurrentMonth: true, data: [] },
  { date: "2024-06-09", isCurrentMonth: true, data: [] },
  { date: "2024-06-10", isCurrentMonth: true, data: [] },
  { date: "2024-06-11", isCurrentMonth: true, data: [] },
  { date: "2024-06-12", isCurrentMonth: true, data: [] },
  { date: "2024-06-13", isCurrentMonth: true, data: [] },
  { date: "2024-06-14", isCurrentMonth: true, data: [] },
  { date: "2024-06-15", isCurrentMonth: true, data: [] },
  { date: "2024-06-16", isCurrentMonth: true, data: [] },
  { date: "2024-06-17", isCurrentMonth: true, data: [] },
  { date: "2024-06-18", isCurrentMonth: true, data: [] },
  { date: "2024-06-19", isCurrentMonth: true, data: [] },
  { date: "2024-06-20", isCurrentMonth: true, data: [] },
  { date: "2024-06-21", isCurrentMonth: true, data: [] },
  { date: "2024-06-22", isCurrentMonth: true, data: [] },
  { date: "2024-06-23", isCurrentMonth: true, data: [] },
  { date: "2024-06-24", isCurrentMonth: true, data: [] },
  { date: "2024-06-25", isCurrentMonth: true, data: [] },
  { date: "2024-06-26", isCurrentMonth: true, data: [] },
  { date: "2024-06-27", isCurrentMonth: true, data: [] },
  { date: "2024-06-28", isCurrentMonth: true, data: [] },
  { date: "2024-06-29", isCurrentMonth: true, data: [] },
  { date: "2024-06-30", isCurrentMonth: true, data: [] },
  { date: "2024-07-01", data: [] },
  { date: "2024-07-02", data: [] },
  { date: "2024-07-03", data: [] },
  { date: "2024-07-04", data: [] },
  { date: "2024-07-05", data: [] },
  { date: "2024-07-06", data: [] },
  { date: "2024-07-07", data: [] },
];

const CalendarPatient = () => {
  const currentMonth = moment(new Date()).month();
  const year = moment(new Date()).year();

  const { dailyDiet } = usePatient();

  DAYS.forEach((day) => {
    const matchingDiet = dailyDiet?.find((diet) => {
      return diet.date === (day.date as unknown as Date);
    });
    if (matchingDiet) {
      day.data = matchingDiet.foods as never;
    }
  });

  const monthSelected = MONTHS[currentMonth];

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time>
            {monthSelected} {year}
          </time>
        </h1>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">onday</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">uesday</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ednesday</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hursday</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">riday</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">aturday</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">unday</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {DAYS.map((day) => (
              <DayCalendar key={day.date} day={day as Day} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPatient;
