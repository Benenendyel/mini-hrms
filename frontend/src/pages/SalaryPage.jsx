import { useState, useEffect } from "react";

// components
import AddSalaryModal from "../components/AddSalaryModal";
import EditingSalaryModal from "../components/EditingSalaryModal";

// context
import { useSalaryContext } from "../contexts/SalaryContext";
import { useEmployeeContext } from "../contexts/EmployeeContext";

// constants
import Icons from "../constants/Icons";
import positionsByDepartment from "../constants/positionsByDepartment";

// utils
import dataFilter from "../utils/dataFilter";
import handleSwipers from "../utils/handleSwipers";

function SalaryPage() {
  const { salaries, salaryLoading } = useSalaryContext();
  const { employees, employeeLoading } = useEmployeeContext();

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [salaryEdit, setSalaryEdit] = useState([]);

  const [leftMax, setLeftMax] = useState(0);
  const [rightMax, setRightMax] = useState(10);

  const [filter, setFilter] = useState(salaries);
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");

  const [departmentDrop, setDepartmentDrop] = useState(false);
  const [statusDrop, setStatusDrop] = useState(false);

  useEffect(() => {
    setFilter(salaries);
  }, [salaries]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount || 0);
  };

  console.log("Salaries from Context:", salaries);
  return (
    <div className="flex relative flex-col px-5 md:px-10 pt-25 min-h-screen gap-6">
      {addModal && (
        <AddSalaryModal employees={employees} setAddModal={setAddModal} />
      )}
      {editModal && (
        <EditingSalaryModal
          setEditModal={setEditModal}
          salaryDetails={salaryEdit}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-10 md:mb-0">
          <span className="text-4xl font-bold tracking-tight  text-[#0F52BA]">
            Manage Salary
          </span>
          <p className="text-sm tracking-wide">
            Keep track of employees salary details and computations.
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
            Add Salary
          </button>
        </div>
      </div>

      <div className="border border-slate-200  rounded-xl bg-white">
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
                        setFilter(dataFilter(salaries, key, "All Status"));
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
          </div>
          <div className="flex flex-row items-center justify-between md:justify-end gap-4 border-t py-3 md:border-t-0 md:pt-0 border-slate-100">
            <span className="text-sm text-slate-500 ">
              Showing{" "}
              <span className="font-semibold">
                {filter?.length === 0 ? 0 : leftMax + 1}-
                {Math.min(rightMax, filter?.length || 0)}
              </span>{" "}
              of <span className="font-semibold">{filter?.length || 0}</span>
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

        <div className="flex flex-col ">
          <div
            className={`grid  ${editing ? "md:grid-cols-8 grid-cols-5" : "md:grid-cols-7 grid-cols-4"} gap-4 px-4 py-4 border-b border-slate-200 text-sm text-[#64748B] bg-[#f8fafc]  font-semibold  items-center`}
          >
            {[
              { label: "ID", className: "hidden md:block" },
              { label: "Employee ID", className: "" },
              { label: "Full Name", className: "" },
              { label: "Basic Salary", className: "" },
              { label: "Allowance", className: "hidden md:block" },
              { label: "Deductions", className: "hidden md:block" },
              { label: "Net Salary", className: "" },
              editing ? { label: " ", className: "" } : null,
            ]
              .filter(Boolean)
              .map((key, index) => (
                <span key={index} className={key.className}>
                  {key.label}
                </span>
              ))}
          </div>

          {salaryLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {filter?.slice(leftMax, rightMax).map((salary, index) => (
                <div
                  className={`${editing ? "bg-yellow-150 hover:bg-yellow-100 active:bg-yellow-100 cursor-pointer grid-cols-5 md:grid-cols-8" : "bg-white grid-cols-4 md:grid-cols-7"} grid  gap-4 px-4 py-4 border-b border-slate-200 text-sm  text-slate-600  items-center`}
                  key={index}
                  onClick={() => {
                    if (editing) {
                      setSalaryEdit(salary);
                      setEditModal(true);
                    }
                  }}
                >
                  <span className="hidden md:block">{salary.id}</span>
                  <span>#{salary.employee_id}</span>
                  <span>{salary.full_name}</span>
                  <span>{formatCurrency(salary.basic_salary)}</span>
                  <span className="hidden md:block font-semibold text-[#1d6f42]">
                    +{formatCurrency(salary.allowance)}
                  </span>
                  <span className="hidden md:block font-semibold text-[#c2391e]">
                    -{formatCurrency(salary.deductions)}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(salary.net_salary)}
                  </span>{" "}
                  {editing && (
                    <div className="hover:animate-bounce flex  justify-center items-center gap-2">
                      <img
                        className="w-5 h-5"
                        src={Icons.EditIcon}
                        alt="edit"
                      />{" "}
                      <span className="hidden md:block text-[#fa990e] font-semibold">
                        Edit Salary
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

export default SalaryPage;
