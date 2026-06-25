import { useState, useEffect } from "react";

// componetnts
import AddAttendanceModal from "../components/AddAttendanceModal";
import EditingAttendanceModal from "../components/EditingAttendanceModal";

// context
import { useAttendanceContext } from "../contexts/AttendanceContext";
import { useEmployeeContext } from "../contexts/EmployeeContext";

// constants
import Icons from "../constants/Icons";
import positionsByDepartment from "../constants/positionsByDepartment";

// utils
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";
import dataFilter from "../utils/dataFilter";
import handleSwipers from "../utils/handleSwipers";

function AttendancePage() {
  const { attendance, attendanceLoading } = useAttendanceContext();
  const { employees, employeeLoading } = useEmployeeContext();

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [attendanceEdit, setAttendanceEdit] = useState([]);

  const [leftMax, setLeftMax] = useState(0);
  const [rightMax, setRightMax] = useState(10);

  const [filter, setFilter] = useState(attendance);
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [departmentDrop, setDepartmentDrop] = useState(false);
  const [statusDrop, setStatusDrop] = useState(false);

  useEffect(() => {
    setFilter(attendance);
  }, [attendance]);

  return (
    <div className="flex relative flex-col px-5 md:px-10 pt-25 min-h-screen gap-6">
      {addModal && (
        <AddAttendanceModal employees={employees} setAddModal={setAddModal} />
      )}
      {editModal && (
        <EditingAttendanceModal
          setEditModal={setEditModal}
          attendanceDetails={attendanceEdit}
        />
      )}

      {/* PAGE TAG  */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-10 md:mb-0">
          <span className="text-4xl font-bold tracking-tight  text-[#0F52BA]">
            Manage Attendance
          </span>
          <p className="text-sm tracking-wide">
            Keep track of employees attendance.
          </p>
        </div>
        <div className="flex justify-end  items-end gap-2 ">
          <button
            className={`${editing ? "animate-pulse  bg-[#041c43]" : "bg-[#fa990e]"} hover:bg-[#e08800]  px-3 py-2 cursor-pointer font-semibold text-white rounded-sm `}
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Stop Edit" : "Edit"}
          </button>
          <button
            className="bg-[#0f52ba] px-3 py-2 cursor-pointer font-semibold text-white rounded-sm hover:bg-[#0a3d8f]"
            onClick={() => setAddModal(true)}
          >
            Add Attendance
          </button>
        </div>
      </div>

      {/* EMPLOYEES LIST CONTAINER */}
      <div className="border border-slate-200  rounded-xl bg-white">
        {/* FILTERS AND SWIPERS   */}
        <div className="flex flex-col border-b py-4 border-slate-200 md:flex-row md:items-center md:justify-between px-4 gap-4 md:gap-0">
          <div className="flex flex-row items-center gap-3 text-sm font-medium ">
            <div
              className="relative px-3 py-2 border border-slate-200 rounded-sm  hover:bg-[#f8fafc]  cursor-pointer "
              onClick={() => {
                if (statusDrop) setStatusDrop(false);
                setDepartmentDrop(!departmentDrop);
              }}
            >
              <span>
                {departmentFilter === "All Departments"
                  ? "All Departments"
                  : `Filter: ${departmentFilter}`}
              </span>
              <div
                className={`${departmentDrop ? "flex" : "hidden"} z-10 bg-white w-50 border border-slate-200 rounded-tr-lg rounded-b-lg  flex-col px-2 py-2 gap-2 absolute top-full left-0`}
                onClick={(e) => e.stopPropagation()}
              >
                {["All Departments", ...Object.keys(positionsByDepartment)]
                  .filter((key) => key !== departmentFilter)
                  .map((key, index) => (
                    <span
                      className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                      onClick={() => {
                        setDepartmentFilter(key);
                        setFilter(dataFilter(attendance, key, statusFilter));
                        setLeftMax(0);
                        setRightMax(10);
                        setDepartmentDrop(false);
                      }}
                      key={index}
                    >
                      {key}
                    </span>
                  ))}
              </div>
            </div>

            <div
              className="relative border border-slate-200 rounded-sm  hover:bg-[#f8fafc] px-3 py-2  cursor-pointer"
              onClick={() => {
                if (departmentDrop) setDepartmentDrop(false);
                setStatusDrop(!statusDrop);
              }}
            >
              <span>
                {statusFilter === "All Status"
                  ? "All Status"
                  : `Filter: ${statusFilter}`}
              </span>
              <div
                className={`${statusDrop ? "flex" : "hidden"} z-10 bg-white w-50 border border-slate-200 rounded-tr-lg rounded-b-lg  flex-col px-2 py-2 gap-2 absolute top-full left-0`}
                onClick={(e) => e.stopPropagation()}
              >
                {["All Status", "Present", "Late", "Absent"]
                  .filter((key) => key !== statusFilter)
                  .map((key, index) => (
                    <span
                      className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                      onClick={() => {
                        setStatusFilter(key);
                        setFilter(
                          dataFilter(attendance, departmentFilter, key),
                        );
                        setLeftMax(0);
                        setRightMax(10);
                        setStatusDrop(false);
                      }}
                      key={index}
                    >
                      {key}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between md:justify-end gap-4 border-t py-3 md:border-t-0 md:pt-0 border-slate-100">
            <span className="text-sm text-slate-500 ">
              Showing{" "}
              <span className="font-semibold">
                {filter.length === 0 ? 0 : leftMax + 1}-
                {Math.min(rightMax, filter.length)}
              </span>{" "}
              of <span className="font-semibold">{filter.length}</span>
            </span>

            <div className="flex flex-row gap-2">
              {["<", ">"].map((key, index) => (
                <button
                  key={index}
                  className="px-3 py-2 cursor-pointer border border-slate-200 rounded-sm text-sm font-extrabold  bg-white  hover:bg-[#f8fafc]"
                  onClick={() => {
                    if (key === "<") {
                      handleSwipers(
                        "Left",
                        leftMax,
                        rightMax,
                        filter,
                        setLeftMax,
                        setRightMax,
                      );
                    }
                    if (key === ">") {
                      handleSwipers(
                        "Right",
                        leftMax,
                        rightMax,
                        filter,
                        setLeftMax,
                        setRightMax,
                      );
                    }
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HEADERS */}
        <div className="flex flex-col ">
          <div
            className={`grid  ${editing ? "md:grid-cols-8 grid-cols-5" : "md:grid-cols-7 grid-cols-4"} gap-4 px-4 py-4 border-b border-slate-200 text-sm text-[#64748B] bg-[#f8fafc]  font-semibold  items-center`}
          >
            {[
              { label: "ID", className: "hidden md:block" },
              { label: "Employee ID", className: "" },
              { label: "Full Name", className: "" },
              { label: "Date", className: "" },
              { label: "Time In", className: "hidden md:block" },
              { label: "Time Out", className: "hidden md:block" },
              { label: "Status", className: "" },
              editing ? { label: " ", className: "" } : null,
            ]
              .filter(Boolean)
              .map((key, index) => (
                <span key={index} className={key.className}>
                  {key.label}
                </span>
              ))}
          </div>

          {attendanceLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {filter.slice(leftMax, rightMax).map((attendance, index) => (
                <div
                  className={`${editing ? "bg-yellow-150 hover:bg-yellow-100 active:bg-yellow-100 cursor-pointer grid-cols-5 md:grid-cols-8" : "bg-white grid-cols-4 md:grid-cols-7"} grid  gap-4 px-4 py-4 border-b border-slate-200 text-sm  text-slate-600  items-center`}
                  key={index}
                  onClick={() => {
                    setAttendanceEdit(attendance);
                    setEditModal(true);
                  }}
                >
                  <span className="hidden md:block">{attendance.id}</span>
                  <span>#{attendance.employee_id}</span>
                  <span>{attendance.full_name}</span>
                  <span>{formatDate(attendance.date)}</span>
                  <span className="hidden md:block">
                    {formatTime(attendance.time_in)}
                  </span>
                  <span className="hidden md:block">
                    {formatTime(attendance.time_out)}
                  </span>
                  <span>{attendance.status}</span>{" "}
                  {editing && (
                    <div className="hover:animate-bounce flex  justify-center items-center gap-2">
                      <img className="w-5 h-5" src={Icons.EditIcon} />{" "}
                      <span className="hidden md:block text-[#fa990e] font-semibold">
                        Edit Employee
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
