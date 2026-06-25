import { useState } from "react";

// context
import { useSalaryContext } from "../contexts/SalaryContext";

// constants
import Icons from "../constants/Icons";

function EditingSalaryModal({ setEditModal, salaryDetails }) {
  const [basicSalary, setBasicSalary] = useState(salaryDetails.basic_salary);
  const [allowance, setAllowance] = useState(salaryDetails.allowance);
  const [deductions, setDeductions] = useState(salaryDetails.deductions);

  const { editSalary, deleteSalary } = useSalaryContext();

  const hasChanges =
    basicSalary != salaryDetails.basic_salary ||
    allowance != salaryDetails.allowance ||
    deductions != salaryDetails.deductions;

  const handleEdit = async () => {
    if (!hasChanges) return;

    const salary = {
      id: salaryDetails.id,
      basicSalary,
      allowance,
      deductions,
    };

    const result = await editSalary(salary);
    if (result.success) setEditModal(false);
  };

  const handleDelete = async () => {
    const result = await deleteSalary(salaryDetails.id);
    if (result.success) setEditModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <div className="bg-white rounded-lg py-2 w-full max-w-lg">
        <div className="flex flex-row py-2 px-4 justify-between border-b border-b-slate-200 items-center">
          <div>
            <span className="tracking-tight text-[#0F52BA] text-4xl font-bold mb-4">
              Edit Salary
            </span>
            <p className="text-sm">
              Update salary details for {salaryDetails.full_name}.
            </p>
          </div>
          <button
            className="px-3 py-1 rounded-sm font-semibold text-center border border-slate-200 hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setEditModal(false)}
          >
            x
          </button>
        </div>

        <div className="grid grid-cols-2 py-4 px-4 gap-6">
          <div className="flex flex-col-reverse">
            <input
              id="basicSalary"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setBasicSalary(e.target.value)}
              value={basicSalary}
              type="number"
            />
            <label
              className="text-[#64748B] font-semibold"
              htmlFor="basicSalary"
            >
              Basic Salary
            </label>
          </div>

          <div className="flex flex-col-reverse">
            <input
              id="allowance"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setAllowance(e.target.value)}
              value={allowance}
              type="number"
            />
            <label className="text-[#64748B] font-semibold" htmlFor="allowance">
              Allowance
            </label>
          </div>

          <div className="flex flex-col-reverse">
            <input
              id="deductions"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setDeductions(e.target.value)}
              value={deductions}
              type="number"
            />
            <label
              className="text-[#64748B] font-semibold"
              htmlFor="deductions"
            >
              Deductions
            </label>
          </div>
        </div>

        <div className="flex justify-end items-end px-4 py-2 gap-2">
          <button
            className="px-3 py-2 bg-[#c2391e] hover:bg-[#0a3d8f] font-semibold text-white rounded-sm cursor-pointer"
            onClick={handleDelete}
          >
            Delete Salary
          </button>
          <button
            className={`${hasChanges ? "opacity-100" : "opacity-60 pointer-events-none"} px-3 py-2 bg-[#0F52BA] hover:bg-[#0a3d8f] font-semibold text-white rounded-sm cursor-pointer`}
            onClick={handleEdit}
          >
            Save Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditingSalaryModal;
