import { useState, useEffect } from "react";

// api
import salaryApi from "../api/salary";

const useSalaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [lightSwitch, setLightSwitch] = useState(false);
  const [salaryLoading, setSalaryLoading] = useState(false);

  const fetchSalaries = async () => {
    try {
      setSalaryLoading(true);
      const data = await salaryApi.getSalaries();

      setSalaries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSalaryLoading(false);
    }
  };

  const addSalary = async (salary) => {
    try {
      const result = await salaryApi.addSalary(salary);
      setLightSwitch(!lightSwitch);

      if (result.success) window.location.reload();

      return result;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  const editSalary = async (salary) => {
    try {
      const result = await salaryApi.editSalary(salary);
      setLightSwitch(!lightSwitch);

      return result;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  const deleteSalary = async (id) => {
    try {
      const result = await salaryApi.deleteSalary(id);
      setLightSwitch(!lightSwitch);

      return result;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [lightSwitch]);

  return {
    salaries: salaries || [],
    salaryLoading,
    addSalary,
    editSalary,
    deleteSalary,
  };
};

export default useSalaries;
