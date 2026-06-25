const attendance = {
  getAttendances: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/attendance`);

      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  addTimeIn: async (attendance) => {
    try {
      const { employeeId, date, timeIn, status } = attendance;
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId,
            date,
            timeIn,
            status,
          }),
        },
      );

      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  editAttendance: async (attendance) => {
    try {
      const { id, date, timeIn, timeOut, status } = attendance;
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            date,
            timeIn,
            timeOut,
            status,
          }),
        },
      );

      return await res.json();
    } catch (error) {
      throw new Error("Something went wrong:", error);
    }
  },

  deleteAttendance: async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendance/${id}`,
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

export default attendance;
