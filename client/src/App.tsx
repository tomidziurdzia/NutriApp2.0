import { BrowserRouter } from "react-router-dom";
import { DoctorProvider } from "./context/DoctorProvider";
import { PatientProvider } from "./context/PatientProvider";
import AppRoutes from "./pages/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <DoctorProvider>
        <PatientProvider>
          <AppRoutes />
        </PatientProvider>
      </DoctorProvider>
    </BrowserRouter>
  );
};

export default App;
