import { createContext, useContext } from "react";

// hook
import usePayroll from "../hooks/usePayroll";

const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const { payroll, payrollLoading } = usePayroll();

  return (
    <PayrollContext.Provider value={{ payroll, payrollLoading }}>
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayrollContext = () => useContext(PayrollContext);
