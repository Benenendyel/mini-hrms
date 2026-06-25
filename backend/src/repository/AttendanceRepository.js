// config
const pool = require("../config/db.js");

const AttendanceRepository = {
  getAllAttendance: async () => {
    const queryText = `
        SELECT a.id, a.employee_id, e.full_name, e.department, a.date, a.time_in, a.time_out, a.status 
        FROM attendance AS a 
        JOIN employees AS e ON a.employee_id = e.employee_id 
        ORDER BY a.id DESC`;
    const result = await pool.query(queryText);

    return result.rows;
  },

  addTimeIn: async (employeeId, date, timeIn, status) => {
    try {
      const values = [employeeId, date, timeIn, status];
      const queryText = `
    INSERT INTO attendance (employee_id, date, time_in, status) 
    VALUES ($1, $2, $3, $4)`;

      const result = await pool.query(queryText, values);

      return result;
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("DUPLICATE");
      }

      throw error;
    }
  },

  editAttendance: async (id, date, timeIn, timeOut, status) => {
    try {
      const values = [id, date, timeIn, timeOut, status];
      const queryText =
        "UPDATE attendance SET date = $2, time_in = $3, time_out = $4, status = $5 WHERE id = $1";

      const result = await pool.query(queryText, values);

      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteAttendance: async (id) => {
    try {
      const queryText = "DELETE FROM attendance WHERE id = $1";
      const result = await pool.query(queryText, [id]);

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = AttendanceRepository;
