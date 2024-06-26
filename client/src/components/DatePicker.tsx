import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePatient from "@/hooks/usePatient";

export const DatePicker = () =>
  //   {
  //   date,
  //   setDate,
  // }: {
  //   date: Date | undefined;
  //   setDate: Dispatch<SetStateAction<Date | undefined>>;
  //     }
  {
    const { date, setDatePicker } = usePatient();
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            className="bg-white text-black"
            mode="single"
            selected={date}
            onSelect={setDatePicker}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };
