// repository
const PayrollRepository = require("../repository/PayrollRepository");

const PayrollController = {
  getAllPayroll: async (req, res) => {
    try {
      const payroll = await PayrollRepository.getAllPayroll();
      res.status(200).json(payroll);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PayrollController;
