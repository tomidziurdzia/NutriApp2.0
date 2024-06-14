import { createContext, ReactNode } from "react";

interface PatientContextType {}

const defaultContextValue: PatientContextType = {};

const PatientContext = createContext<PatientContextType>(defaultContextValue);

const PatientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PatientContext.Provider value={{}}>{children}</PatientContext.Provider>
  );
};

export { PatientProvider };
export default PatientContext;
