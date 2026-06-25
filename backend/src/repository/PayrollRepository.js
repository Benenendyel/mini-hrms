// config
const pool = require("../config/db.js");

const PayrollRepository = {
  getAllPayroll: async () => {
    const queryText = `
        SELECT p.id, p.employee_id, e.full_name, e.department, p.basic_salary, p.allowance, p.deductions, p.net_salary, p.payroll_date
        FROM payroll AS p
        JOIN employees AS e ON p.employee_id = e.employee_id
        ORDER BY p.id DESC`;
    const result = await pool.query(queryText);

    return result.rows;
  },

  addPayroll: async (
    employeeId,
    basicSalary,
    allowance,
    deductions,
    netSalary,
  ) => {
    const queryText = `
        INSERT INTO payroll (employee_id, basic_salary, allowance, deductions, net_salary)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await pool.query(queryText, [
      employeeId,
      basicSalary,
      allowance,
      deductions,
      netSalary,
    ]);

    return result.rows[0];
  },
};

module.exports = PayrollRepository;
