import {
  Apple,
  Calendar,
  Home,
  LogOut,
  MessageSquare,
  PersonStanding,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import usePatient from "@/hooks/usePatient";
import useDoctor from "@/hooks/useDoctor";

const Sidebar = () => {
  const { role: patientRole } = usePatient();
  const { role: doctorRole } = useDoctor();

  const role = patientRole || doctorRole;
  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 gap-4 text-sm font-medium lg:px-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
          >
            <Home className="h-6 w-6" />
            Dashboard
          </NavLink>
          {role === "PATIENT" && (
            <NavLink
              to="/diet"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <PersonStanding className="h-6 w-6" />
              Diet
            </NavLink>
          )}
          {role === "DOCTOR" && (
            <NavLink
              to="/pacients"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <PersonStanding className="h-6 w-6" />
              Pacients
            </NavLink>
          )}
          <NavLink
            to="/food"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
          >
            <Apple className="h-6 w-6" />
            Food
          </NavLink>
          {role === "DOCTOR" && (
            <NavLink
              to="/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <Calendar className="h-6 w-6" />
              Calendar
            </NavLink>
          )}
          <NavLink
            to="/chat"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
          >
            <MessageSquare className="h-6 w-6" />
            Chat
          </NavLink>{" "}
          {role === "DOCTOR" && (
            <NavLink
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <Settings className="h-6 w-6" />
              Settings
            </NavLink>
          )}
        </nav>
      </div>
      <div className="pb-2 flex items-center gap-3 rounded-lg px-7 text-muted-foreground transition-all hover:bg-primary hover:text-white">
        <LogOut />
        <Button className="bg-transparent text-muted-foreground p-0">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Sidebar;
