import { useState, useEffect } from "react";

// components
import AddEmployeeModal from "../components/AddEmployeeModal";
import ExportPreviewModal from "../components/ExportPreviewModal";
import EditingEmployeeModal from "../components/EditingEmployeeModal";

// context
import { useEmployeeContext } from "../contexts/EmployeeContext";

// utils
import formatDate from "../utils/formatDate";
import dataFilter from "../utils/dataFilter";
import handleSwipers from "../utils/handleSwipers";

// constants
import Icons from "../constants/Icons";
import positionsByDepartment from "../constants/positionsByDepartment";

const EmployeePage = () => {
  const { employees, employeeLoading } = useEmployeeContext();

  const [addModal, setAddModal] = useState(false);
  const [leftMax, setLeftMax] = useState(0);
  const [rightMax, setRightMax] = useState(10);

  const [editing, setEditing] = useState(false);
  const [employeeEdit, setEmployeeEdit] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const [exportModal, setExportModal] = useState(false);

  const [filter, setFilter] = useState(employees);
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [departmentDrop, setDepartmentDrop] = useState(false);
  const [statusDrop, setStatusDrop] = useState(false);

  useEffect(() => {
    setFilter(employees);
  }, [employees]);

  return (
    <div className="flex relative flex-col px-5 md:px-10 pt-25 min-h-screen gap-6">
      {addModal && <AddEmployeeModal setAddModal={setAddModal} />}
      {exportModal && (
        <ExportPreviewModal
          employees={employees}
          setExportModal={setExportModal}
        />
      )}
      {editModal && (
        <EditingEmployeeModal
          setEditModal={setEditModal}
          employeeDetails={employeeEdit}
        />
      )}

      {/* PAGE TAG  */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-10 md:mb-0">
          <span className="text-4xl font-bold tracking-tight  text-[#0F52BA]">
            Employee Directory
          </span>
          <p className="text-sm tracking-wide">
            Manage organization personnel, roles, and status tracking.
          </p>
        </div>
        <div className="flex justify-end  items-end gap-2 ">
          <button
            className="bg-[#1D6F42]  hover:bg-[#165a34] px-3 py-2 cursor-pointer font-semibold text-white rounded-sm "
            onClick={() => setExportModal(true)}
          >
            Export
          </button>
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
            Add Employee
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
                        setFilter(dataFilter(employees, key, statusFilter));
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
              <div></div>
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
                {["All Status", "Active", "On Leave", "Resigned"]
                  .filter((key) => key !== statusFilter)
                  .map((key, index) => (
                    <span
                      className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                      onClick={() => {
                        setStatusFilter(key);
                        setFilter(dataFilter(employees, departmentFilter, key));
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
            className={`grid  ${editing ? "md:grid-cols-9 grid-cols-5" : "md:grid-cols-8 grid-cols-4"} gap-4 px-4 py-4 border-b border-slate-200 text-sm text-[#64748B] bg-[#f8fafc]  font-semibold  items-center`}
          >
            {[
              { label: "Employee ID", className: "" },
              { label: "Full Name", className: "" },
              { label: "Email", className: "hidden md:block" },
              { label: "Contact", className: "hidden md:block" },
              { label: "Position", className: "" },
              { label: "Department", className: "hidden md:block" },
              { label: "Date Hired", className: "hidden md:block" },
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

          {employeeLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {filter.slice(leftMax, rightMax).map((employee, index) => (
                <div
                  className={`${editing ? "bg-yellow-150 hover:bg-yellow-100 active:bg-yellow-100 cursor-pointer grid-cols-5 md:grid-cols-9" : "bg-white grid-cols-4 md:grid-cols-8"} grid  gap-4 px-4 py-4 border-b border-slate-200 text-sm  text-slate-600  items-center`}
                  key={index}
                  onClick={() => {
                    if (editing) {
                      setEmployeeEdit(employee);
                      setEditModal(true);
                    }
                  }}
                >
                  <span>#{employee.employee_id}</span>
                  <span>{employee.full_name}</span>
                  <span className="hidden md:block">{employee.email}</span>
                  <span className="hidden md:block">
                    {employee.contact_number}
                  </span>
                  <span>{employee.position}</span>
                  <span className="hidden md:block">{employee.department}</span>
                  <span className="hidden md:block">
                    {formatDate(employee.date_hired)}
                  </span>
                  <span>{employee.employment_status}</span>
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
};

export default EmployeePage;
