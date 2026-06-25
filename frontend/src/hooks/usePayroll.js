import { useState, useEffect } from "react";

// api
import payrollApi from "../api/payroll";

const usePayroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [payrollLoading, setPayrollLoading] = useState(false);

  const fetchPayroll = async () => {
    try {
      setPayrollLoading(true);
      const data = await payrollApi.getPayroll();
      setPayroll(data);
    } catch (error) {
      console.error(error);
    } finally {
      setPayrollLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  return {
    payroll: payroll || [],
    payrollLoading,
  };
};

export default usePayroll;
