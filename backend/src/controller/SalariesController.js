// repository
const SalariesRepository = require("../repository/SalariesRepository");

const SalaryController = {
  getAllSalaries: async (req, res) => {
    try {
      const salaries = await SalariesRepository.getAllSalaries();
      res.status(200).json(salaries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addSalary: async (req, res) => {
    try {
      const { employeeId, basicSalary, allowance, deductions } = req.body;
      if (!employeeId || basicSalary === undefined) {
        return res.status(400).json({
          message: "Employee ID and Basic Salary are required.",
          success: false,
        });
      }

      const netSalary =
        parseFloat(basicSalary) +
        parseFloat(allowance || 0) -
        parseFloat(deductions || 0);

      if (netSalary < 0) {
        return res.status(400).json({
          message: "Deductions cannot exceed Basic Salary + Allowance.",
          success: false,
        });
      }

      await SalariesRepository.addSalary(
        employeeId,
        basicSalary,
        allowance || 0,
        deductions || 0,
        netSalary,
      );

      return res
        .status(201)
        .json({ message: "Salary added successfully!", success: true });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({
          message: "Employee already has a salary record.",
          success: false,
        });
      }

      return res
        .status(500)
        .json({ message: "Internal server error.", success: false });
    }
  },

  editSalary: async (req, res) => {
    try {
      const { id, basicSalary, allowance, deductions } = req.body;

      if (!id)
        return res
          .status(400)
          .json({ message: "Row ID is required.", success: false });

      const netSalary =
        parseFloat(basicSalary) +
        parseFloat(allowance || 0) -
        parseFloat(deductions || 0);

      await SalariesRepository.editSalary(
        id,
        basicSalary,
        allowance || 0,
        deductions || 0,
        netSalary,
      );

      if (netSalary < 0) {
        return res.status(400).json({
          message: "Deductions cannot exceed Basic Salary + Allowance.",
          success: false,
        });
      }

      return res
        .status(200)
        .json({ message: "Salary updated successfully!", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error.", success: false });
    }
  },

  deleteSalary: async (req, res) => {
    try {
      const { id } = req.params;
      await SalariesRepository.deleteSalary(id);

      return res.status(200).json({ message: "Deleted!", success: true });
    } catch (error) {
      return res.status(500).json({ message: "Error", success: false });
    }
  },
};

module.exports = SalaryController;
