import { useState, useEffect } from "react";

// api
import employeeApi from "../api/employee";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [lightSwitch, setLightSwitch] = useState(false);
  const [employeeLoading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeApi.getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      return { message: error.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const result = await employeeApi.addEmployee(employee);
      setLightSwitch(!lightSwitch);

      return result;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  const editEmployee = async (employee) => {
    try {
      const result = await employeeApi.editEmployee(employee);
      setLightSwitch(!lightSwitch);

      return result;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const result = await employeeApi.deleteEmployee(employeeId);
      setLightSwitch(!lightSwitch);

      window.location.reload();

      return result;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [lightSwitch]);

  return {
    employees: employees || [],
    employeeLoading,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };
};

export default useEmployees;
