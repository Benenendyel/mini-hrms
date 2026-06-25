const router = require("express").Router();

// controller
const attendanceController = require("../controller/AttendanceController");

router.get("/api/attendance", attendanceController.getAllAttendance);
router.post("/api/attendance", attendanceController.addTimeIn);
router.put("/api/attendance", attendanceController.editAttendance);
router.delete("/api/attendance/:id", attendanceController.deleteAttendance);

module.exports = router;
