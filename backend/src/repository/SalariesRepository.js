// config
const pool = require("../config/db.js");

// repository
const PayrollRepository = require("./PayrollRepository");

const SalaryRepository = {
  getAllSalaries: async () => {
    const queryText = `
        SELECT s.id, s.employee_id, e.full_name, e.department, s.basic_salary, s.allowance, s.deductions, s.net_salary
        FROM salaries AS s 
        JOIN employees AS e ON s.employee_id = e.employee_id 
        ORDER BY s.id DESC`;
    const result = await pool.query(queryText);

    return result.rows;
  },

  addSalary: async (
    employeeId,
    basicSalary,
    allowance,
    deductions,
    netSalary,
  ) => {
    const queryText = `
        INSERT INTO salaries (employee_id, basic_salary, allowance, deductions, net_salary) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await pool.query(queryText, [
      employeeId,
      basicSalary,
      allowance,
      deductions,
      netSalary,
    ]);

    await PayrollRepository.addPayroll(
      employeeId,
      basicSalary,
      allowance,
      deductions,
      netSalary,
    );

    return result.rows[0];
  },

  editSalary: async (id, basicSalary, allowance, deductions, netSalary) => {
    const queryText = `
        UPDATE salaries 
        SET basic_salary = $2, allowance = $3, deductions = $4, net_salary = $5 
        WHERE id = $1 RETURNING *`;
    const result = await pool.query(queryText, [
      id,
      basicSalary,
      allowance,
      deductions,
      netSalary,
    ]);

    return result.rows[0];
  },

  deleteSalary: async (id) => {
    const queryText = "DELETE FROM salaries WHERE id = $1";
    const result = await pool.query(queryText, [id]);

    return result;
  },
};

module.exports = SalaryRepository;
