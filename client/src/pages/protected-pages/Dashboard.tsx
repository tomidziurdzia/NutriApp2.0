import { CalendarDoctor, CalendarPatient } from "@/components";
import useDoctor from "@/hooks/useDoctor";
import usePatient from "@/hooks/usePatient";

const Dashboard = () => {
  const { role: patientRole } = usePatient();
  const { role: doctorRole } = useDoctor();

  const role = patientRole || doctorRole;
  return (
    <>
      {role === "PATIENT" && <CalendarPatient />}
      {role === "DOCTOR" && <CalendarDoctor />}
    </>
  );
};

export default Dashboard;
