const salaryApi = {
  getSalaries: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/salaries`);
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  addSalary: async (salary) => {
    try {
      const { employeeId, basicSalary, allowance, deductions } = salary;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/salaries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          basicSalary,
          allowance,
          deductions,
        }),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  editSalary: async (salary) => {
    try {
      const { id, basicSalary, allowance, deductions } = salary;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/salaries`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          basicSalary,
          allowance,
          deductions,
        }),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  deleteSalary: async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/salaries/${id}`,
        {
          method: "DELETE",
        },
      );
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },
};

export default salaryApi;
