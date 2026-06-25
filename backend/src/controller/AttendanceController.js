// repository
const attendanceRepository = require("../repository/AttendanceRepository");

const attendanceController = {
  getAllAttendance: async (req, res) => {
    try {
      const attendanceList = await attendanceRepository.getAllAttendance();
      return res
        .status(200)
        .json({ attendance: attendanceList, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  addTimeIn: async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);
      const { employeeId, date, timeIn, status } = req.body;

      if (!employeeId || !date || !timeIn || !status) {
        return res.status(400).json({
          message:
            "Missing fields! Make sure employeeId, date, timeIn, and status are sent.",
          success: false,
        });
      }

      await attendanceRepository.addTimeIn(employeeId, date, timeIn, status);

      return res.status(201).json({
        message: "Employee attendance added succesfully!",
        success: true,
      });
    } catch (error) {
      if (error.message === "DUPLICATE") {
        return res.status(409).json({
          message: "Attendance for this employee on this date already exists.",
          success: false,
        });
      }

      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  editAttendance: async (req, res) => {
    try {
      const { id, date, timeIn, timeOut, status } = req.body;

      if (!id || !date || !status) {
        return res.status(400).json({
          message: "Missing fields! Make sure date and status are not empty.",
          success: false,
        });
      }
      await attendanceRepository.editAttendance(
        id,
        date,
        timeIn,
        timeOut,
        status,
      );

      return res
        .status(200)
        .json({ message: "Employee edited succesfully!", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  deleteAttendance: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .json({ message: "ROW ID is required.", success: false });

      await attendanceRepository.deleteAttendance(id);

      return res.status(200).json({
        message: "Attendance record deleted successfully!",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Something went wrong deleting the attendance record. Please try again.",
        success: false,
      });
    }
  },
};

module.exports = attendanceController;
