require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRouter = require("./src/router/AuthRouter");
const employeeRouter = require("./src/router/EmployeeRouter");
const attendanceRouter = require("./src/router/AttendanceRouter");
const salariesRouter = require("./src/router/SalariesRouter");
const payrollRouter = require("./src/router/PayrollRouter");
require("./src/config/db.js");

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(employeeRouter);
app.use(attendanceRouter);
app.use(salariesRouter);
app.use(payrollRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening to PORT", PORT);
});
