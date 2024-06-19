import {
  MenuIcon,
  PersonStanding,
  Calendar,
  MessageSquare,
  Sandwich,
  LogOut,
  Apple,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useDoctor from "@/hooks/useDoctor";
import usePatient from "@/hooks/usePatient";

const Header = () => {
  const { doctor, role: doctorRole } = useDoctor();
  const { patient, role: patientRole } = usePatient();

  const role = patientRole || doctorRole;
  return (
    <div className="flex md:justify-end justify-start h-14 items-center gap-4 border-b px-4 lg:h-[65px] lg:px-6">
      <div className="hidden md:flex justify-center items-center gap-4 bg-muted py-1 px-4 rounded-3xl shadow-sm">
        <span>
          {role === "DOCTOR"
            ? `${doctor?.name}`
            : role === "PATIENT"
            ? `${patient?.name}`
            : ""}{" "}
          {role === "DOCTOR"
            ? `${doctor?.lastname}`
            : role === "PATIENT"
            ? `${patient?.lastname}`
            : ""}
        </span>
        <Avatar>
          {doctor && <AvatarImage alt="@shadcn" src={doctor?.avatar} />}
          {patient && <AvatarImage alt="@shadcn" src={patient?.avatar} />}
          <AvatarFallback>
            {role === "DOCTOR"
              ? `${doctor?.name.at(0)}${doctor?.lastname.at(0)}`
              : role === "PATIENT"
              ? `${patient?.name.at(0)}${patient?.lastname.at(0)}`
              : ""}
          </AvatarFallback>
        </Avatar>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col justify-between">
          <nav className="grid gap-2 text-lg font-medium">
            <Link to="/" className="flex pb-2 items-center gap-2 font-semibold">
              <div className="bg-primary text-white p-2 rounded-md">
                <Sandwich strokeWidth="1.5" className="h-6 w-6" />
              </div>
              <span className="text-primary">App name</span>
            </Link>
            <NavLink
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <Calendar className="h-6 w-6" />
              Calendar
            </NavLink>
            <NavLink
              to="/pacients"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <PersonStanding className="h-6 w-6" />
              Pacients
            </NavLink>
            <NavLink
              to="/food"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <Apple className="h-6 w-6" />
              Food
            </NavLink>
            <NavLink
              to="/chat"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <MessageSquare className="h-6 w-6" />
              Chat
            </NavLink>{" "}
          </nav>
          <Button className="flex items-center justify-start bg-transparent text-lg p-0 pb-2 gap-3 rounded-lg px-3 text-muted-foreground transition-all hover:bg-primary hover:text-white">
            <LogOut />
            Logout
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
