const router = require("express").Router();

// controller
const PayrollController = require("../controller/PayrollController");

router.get("/api/payroll", PayrollController.getAllPayroll);

module.exports = router;
