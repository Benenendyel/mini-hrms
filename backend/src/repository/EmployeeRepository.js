// config
const pool = require("../config/db.js");

const EmployeeRepository = {
  getAllEmployees: async () => {
    const queryText = "SELECT * FROM employees ORDER BY employee_id ASC";
    const result = await pool.query(queryText);

    return result.rows;
  },

  addEmployee: async (fullName, email, contactNumber, position, department) => {
    try {
      const values = [fullName, email, contactNumber, position, department];
      const queryText =
        "INSERT INTO employees (full_name, email, contact_number, position, department) VALUES ($1, $2, $3, $4, $5)";

      const result = await pool.query(queryText, values);

      return result;
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("DUPLICATE");
      }

      throw error;
    }
  },

  editEmployee: async (
    employeeId,
    fullName,
    email,
    contactNumber,
    position,
    department,
    hiredDate,
    employmentStatus,
  ) => {
    const values = [
      employeeId,
      fullName,
      email,
      contactNumber,
      position,
      department,
      hiredDate,
      employmentStatus,
    ];
    const queryText =
      "UPDATE employees SET full_name = $2, email = $3, contact_number = $4, position = $5, department = $6, date_hired = $7, employment_status = $8 WHERE employee_id = $1";
    const result = await pool.query(queryText, values);

    return result;
  },

  deleteEmployee: async (employeeId) => {
    const queryText = "DELETE FROM employees WHERE employee_id = $1";
    const result = await pool.query(queryText, [employeeId]);

    return result;
  },
};

module.exports = EmployeeRepository;
