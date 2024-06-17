import { ProtectedRoutes, PublicRoutes } from "@/layouts";
import { Routes, Route, Navigate } from "react-router-dom";
import useDoctor from "../hooks/useDoctor";
// import usePatient from "../hooks/usePatient";
import SignIn from "./public-pages/SignIn";
import SignUp from "./public-pages/SignUp";
import { DashboardDoctor, Pacients } from "./protected-pages/doctor";
import Food from "./protected-pages/Food";
import { SignInPatient } from "./public-pages";

const AppRoutes = () => {
  const { status } = useDoctor();
  // const {s} = usePatient();

  // let status = "authenticated" || "not-authenticated" || "loading";

  // if (status === "loading") {
  //   return <div>Loading..............</div>;
  // }

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<DashboardDoctor />} />
            <Route path="/pacients" element={<Pacients />} />
            <Route path="/food" element={<Food />} />
          </Route>
          {/*{patient?.role === "USER" ? (
            <Route path="/" element={<ProtectedRoutes />}>
              <Route index element={<DashboardPatient />} />
              <Route path="/food" element={<Food />} />
              <Route path="/diet" element={<Diet />} />
            </Route>
          ) : (
            <Route path="/" element={<ProtectedRoutes />}>
              <Route index element={<DashboardDoctor />} />
              <Route path="/pacients" element={<Pacients />} />
              <Route path="/food" element={<Food />} />
            </Route>
          )} */}
        </>
      ) : (
        <>
          <Route path="/*" element={<Navigate to="/auth/sign-in" />} />
          <Route path="/auth/*" element={<PublicRoutes />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-in-patient" element={<SignInPatient />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
