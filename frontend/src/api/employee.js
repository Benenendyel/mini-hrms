const employee = {
  getEmployees: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`);
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  addEmployee: async (employee) => {
    try {
      const { fullName, email, contactNumber, position, department } = employee;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          contactNumber,
          position,
          department,
        }),
      });

      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  editEmployee: async (employee) => {
    try {
      const {
        employeeId,
        fullName,
        email,
        contactNumber,
        position,
        department,
        dateHired,
        status,
      } = employee;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          fullName,
          email,
          contactNumber,
          position,
          department,
          hiredDate: dateHired,
          employmentStatus: status,
        }),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees/${employeeId}`,
        {
          method: "DELETE",
        },
      );

      return res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },
};

export default employee;
