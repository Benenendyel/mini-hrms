const payrollApi = {
  getPayroll: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payroll`);
      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },
};

export default payrollApi;
