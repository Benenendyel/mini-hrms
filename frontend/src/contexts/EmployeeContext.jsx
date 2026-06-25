import { createContext, useContext } from "react";

// hooks
import useEmployees from "../hooks/useEmployees";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const employees = useEmployees();
  return (
    <EmployeeContext.Provider value={employees}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
