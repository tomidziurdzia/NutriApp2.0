import {
  Apple,
  Calendar,
  LogOut,
  MessageSquare,
  PersonStanding,
} from "lucide-react";
import { NavLink, redirect } from "react-router-dom";
import { Button } from "./ui/button";
import usePatient from "@/hooks/usePatient";
import useDoctor from "@/hooks/useDoctor";

const Sidebar = () => {
  const { role: patientRole, patient } = usePatient();
  const { role: doctorRole, logout } = useDoctor();

  const role = patientRole || doctorRole;

  const patientId = patient?.id;

  const handleLogout = () => {
    logout();
    // navigate("/auth/sign-in");
    return redirect("/auth/sign-in");
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex-1">
        <nav className="grid items-start px-2 gap-4 text-sm font-medium lg:px-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
          >
            <Calendar className="h-6 w-6" />
            Calendar
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
              to="/chats"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <PersonStanding className="h-6 w-6" />
              Chats
            </NavLink>
          )}
          {role === "PATIENT" && (
            <NavLink
              to={`/chat/${patientId}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary hover:text-white"
            >
              <MessageSquare className="h-6 w-6" />
              Chat
            </NavLink>
          )}
        </nav>
      </div>
      <Button
        onClick={handleLogout}
        className="m-4 flex justify-start items-center gap-3 rounded-lg  bg-white hover:text-white hover:bg-primary text-muted-foreground transition-all "
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
