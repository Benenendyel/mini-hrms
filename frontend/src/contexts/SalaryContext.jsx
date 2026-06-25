import { createContext, useContext } from "react";
import useSalaries from "../hooks/useSalaries";

const SalaryContext = createContext();

export const useSalaryContext = () => useContext(SalaryContext);

export const SalaryProvider = ({ children }) => {
  const salaryData = useSalaries();

  return (
    <SalaryContext.Provider value={salaryData}>
      {children}
    </SalaryContext.Provider>
  );
};
