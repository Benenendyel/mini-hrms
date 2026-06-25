const router = require("express").Router();

// controller
const employeeController = require("../controller/EmployeeController");

router.get("/api/employees", employeeController.getAllEmployees);
router.post("/api/employees", employeeController.addEmployee);
router.put("/api/employees", employeeController.editEmployee);
router.delete("/api/employees/:id", employeeController.deleteEmployee);

module.exports = router;
