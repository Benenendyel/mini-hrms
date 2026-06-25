// repository
const employeeRepository = require("../repository/EmployeeRepository");

const employeeController = {
  getAllEmployees: async (req, res) => {
    try {
      const employeeList = await employeeRepository.getAllEmployees();

      return res.status(200).json({ employees: employeeList, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  addEmployee: async (req, res) => {
    try {
      const { fullName, email, contactNumber, position, department } = req.body;

      if (!fullName || !email || !position || !department)
        return res.status(400).json({
          message: "Please fill the required infos.",
          success: false,
        });

      await employeeRepository.addEmployee(
        fullName,
        email,
        contactNumber,
        position,
        department,
      );

      return res
        .status(201)
        .json({ message: "Employee added succesfully!", success: true });
    } catch (error) {
      if (error.message === "DUPLICATE") {
        return res.status(409).json({
          message: "An employee with this email already exists.",
          success: false,
        });
      }

      return res.status(500).json({
        message: "Something went wrong adding the employee. Please try again.",
        success: false,
      });
    }
  },

  editEmployee: async (req, res) => {
    try {
      const {
        employeeId,
        fullName,
        email,
        contactNumber,
        position,
        department,
        hiredDate,
        employmentStatus,
      } = req.body;

      if (
        !fullName ||
        !email ||
        !position ||
        !department ||
        !hiredDate ||
        !employmentStatus
      )
        return res.status(400).json({
          message: "Please fill the required infos.",
          success: false,
        });

      await employeeRepository.editEmployee(
        employeeId,
        fullName,
        email,
        contactNumber,
        position,
        department,
        hiredDate,
        employmentStatus,
      );

      return res
        .status(200)
        .json({ message: "Employee edited succesfully!", success: true });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong editing the employee. Please try again.",
        success: false,
      });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .json({ message: "Employee ID is required.", success: false });
      await employeeRepository.deleteEmployee(id);
      return res
        .status(200)
        .json({ message: "Employee deleted successfully!", success: true });
    } catch (error) {
      return res.status(500).json({
        message:
          "Something went wrong deleting the employee. Please try again.",
        success: false,
      });
    }
  },
};

module.exports = employeeController;
