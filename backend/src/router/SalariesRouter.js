const router = require("express").Router();

// controller
const salariesController = require("../controller/SalariesController");

// --- SALARIES ROUTES ---
router.get("/api/salaries", salariesController.getAllSalaries);
router.post("/api/salaries", salariesController.addSalary);
router.put("/api/salaries", salariesController.editSalary);
router.delete("/api/salaries/:id", salariesController.deleteSalary);

module.exports = router;
