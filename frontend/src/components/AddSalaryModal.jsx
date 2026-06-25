import { useState } from "react";

// context
import { useSalaryContext } from "../contexts/SalaryContext";

// constats
import Icons from "../constants/Icons";

const AddSalaryModal = ({ employees, setAddModal }) => {
  const { salaries, addSalary } = useSalaryContext();

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [salary, setSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");

  const [employeeDrop, setEmployeeDrop] = useState(false);

  const filteredEmployees = employees.filter(
    (employee) =>
      !salaries.some((salary) => salary.full_name === employee.full_name),
  );

  const handleSubmit = async () => {
    if (!selectedEmployee || !salary) return;

    const salaryData = {
      employeeId: selectedEmployee.employee_id,
      basicSalary: parseFloat(salary),
      allowance: parseFloat(allowance) || 0,
      deductions: parseFloat(deduction) || 0,
    };

    const result = await addSalary(salaryData);
    if (result.success) setAddModal(false);
  };

  console.log(filteredEmployees);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg max-w-lg ">
        <div className="flex flex-row py-2 justify-between border-b border-b-slate-200 items-center">
          <div>
            <span className="tracking-tight  text-[#0F52BA] text-4xl font-bold mb-4">
              Add Employee
            </span>
            <p className="text-sm">
              Enter the official details for the new company member.
            </p>
          </div>
          <button
            className="  px-3 py-1 rounded-sm font-semibold text-center border border-slate-200  hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setAddModal(false)}
          >
            x
          </button>
        </div>

        <div className="flex flex-col py-4  gap-2">
          <div
            name="employeeId"
            className="relative w-full flex flex-col gap-2 p-2 mb-3 border border-slate-200 rounded-md hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setEmployeeDrop(!employeeDrop)}
          >
            <div className="flex justify-between items-center">
              <span>
                {selectedEmployee
                  ? selectedEmployee.full_name
                  : "Select Employee"}
              </span>
              <img className="rotate-180 h-2 w-2" src={Icons.UpArrowIcon} />
            </div>
            <div
              className={`${employeeDrop ? "flex flex-col" : "hidden"} bg-white w-full gap-2 rounded-b-lg absolute z-10 top-full left-0 overflow-y-auto scrollbar-thin max-h-[300px]`}
              onClick={(e) => e.stopPropagation()}
            >
              {filteredEmployees.map((key, index) => (
                <span
                  className="px-2 py-2 cursor-pointer  hover:bg-[#f8fafc]"
                  onClick={() => {
                    setSelectedEmployee(key);
                    setEmployeeDrop(false);
                  }}
                  key={index}
                >
                  {key.full_name}
                </span>
              ))}
            </div>
          </div>
          <input
            type="number"
            name="basicSalary"
            placeholder="Basic Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md outline-none border-slate-200"
          />
          <input
            type="number"
            name="allowance"
            placeholder="Allowance"
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md outline-none border-slate-200"
          />
          <input
            type="number"
            name="deductions"
            placeholder="Deductions"
            value={deduction}
            onChange={(e) => setDeduction(e.target.value)}
            className="w-full p-2 mb-3 border rounded-md outline-none border-slate-200"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className={`${salary && allowance && deduction ? "opacity-100" : "opacity-60"} font-semibold bg-[#0F52BA] text-white px-5 py-2 rounded-sm cursor-pointer`}
          >
            Save Salary
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSalaryModal;
