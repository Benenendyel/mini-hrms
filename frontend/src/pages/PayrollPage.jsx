import { useState, useEffect } from "react";

// context
import { usePayrollContext } from "../contexts/PayrollContext";

// utils
import formatDate from "../utils/formatDate";
import dataFilter from "../utils/dataFilter";
import handleSwipers from "../utils/handleSwipers";

// constants
import positionsByDepartment from "../constants/positionsByDepartment";

const PayrollPage = () => {
  const { payroll, payrollLoading } = usePayrollContext();

  const [leftMax, setLeftMax] = useState(0);
  const [rightMax, setRightMax] = useState(10);

  const [filter, setFilter] = useState(payroll);
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [departmentDrop, setDepartmentDrop] = useState(false);
  const [statusDrop, setStatusDrop] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount || 0);
  };

  useEffect(() => {
    setFilter(payroll);
  }, [payroll]);

  return (
    <div className="flex relative flex-col px-5 md:px-10 pt-25 min-h-screen gap-6">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-10 md:mb-0">
          <span className="text-4xl font-bold tracking-tight text-[#0F52BA]">
            Payroll Summary
          </span>
          <p className="text-sm tracking-wide">
            View salary computations and payroll records for all employees.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl bg-white">
        <div className="flex flex-col border-b py-4 border-slate-200 md:flex-row md:items-center md:justify-between px-4 gap-4 md:gap-0">
          <div className="flex flex-row items-center gap-3 text-sm font-medium">
            <div
              className="relative px-3 py-2 border border-slate-200 rounded-sm hover:bg-[#f8fafc] cursor-pointer"
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
                className={`${departmentDrop ? "flex" : "hidden"} z-10 bg-white w-50 border border-slate-200 rounded-tr-lg rounded-b-lg flex-col px-2 py-2 gap-2 absolute top-full left-0`}
                onClick={(e) => e.stopPropagation()}
              >
                {["All Departments", ...Object.keys(positionsByDepartment)]
                  .filter((key) => key !== departmentFilter)
                  .map((key, index) => (
                    <span
                      className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                      onClick={() => {
                        setDepartmentFilter(key);
                        setFilter(dataFilter(payroll, key, statusFilter));
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
            <span className="text-sm text-slate-500">
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
                  className="px-3 py-2 cursor-pointer border border-slate-200 rounded-sm text-sm font-extrabold bg-white hover:bg-[#f8fafc]"
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

        <div className="flex flex-col">
          <div className="grid md:grid-cols-7 grid-cols-4 gap-4 px-4 py-4 border-b border-slate-200 text-sm text-[#64748B] bg-[#f8fafc] font-semibold items-center">
            {[
              { label: "Employee ID", className: "" },
              { label: "Full Name", className: "" },
              { label: "Basic Salary", className: "" },
              { label: "Allowance", className: "hidden md:block" },
              { label: "Deductions", className: "hidden md:block" },
              { label: "Net Salary", className: "" },
              { label: "Payroll Date", className: "hidden md:block" },
            ].map((key, index) => (
              <span key={index} className={key.className}>
                {key.label}
              </span>
            ))}
          </div>

          {payrollLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {filter.slice(leftMax, rightMax).map((payroll, index) => (
                <div
                  className="grid md:grid-cols-7 grid-cols-4 gap-4 px-4 py-4 border-b border-slate-200 text-sm text-slate-600 bg-white items-center"
                  key={index}
                >
                  <span>#{payroll.employee_id}</span>
                  <span>{payroll.full_name}</span>
                  <span>{formatCurrency(payroll.basic_salary)}</span>
                  <span className="hidden md:block font-semibold text-[#1d6f42]">
                    +{formatCurrency(payroll.allowance)}
                  </span>
                  <span className="hidden md:block font-semibold text-[#c2391e]">
                    -{formatCurrency(payroll.deductions)}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(payroll.net_salary)}
                  </span>
                  <span className="hidden md:block">
                    {formatDate(payroll.payroll_date)}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollPage;
