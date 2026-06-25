// utils
import exportToCsv from "../utils/exportToCsv";
import formatDate from "../utils/formatDate";

const ExportPreviewModal = ({ employees, setExportModal }) => {
  const handleConfirm = () => {
    const rows = employees.map((emp) => [
      emp.employee_id,
      emp.full_name,
      emp.email,
      emp.position,
      emp.department,
      formatDate(emp.date_hired),
      emp.employement_status,
    ]);
    exportToCsv(
      `employees_${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows,
    );
    setExportModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <span className="tracking-tight  text-[#0F52BA] text-4xl font-bold mb-4">
              Export Preview
            </span>
            <p className="text-sm ">
              {employees.length} employee{employees.length !== 1 ? "s" : ""}{" "}
              will be exported
            </p>
          </div>
          <button
            className="  px-3 py-1 rounded-sm font-semibold text-center border border-slate-200  hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setExportModal(false)}
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] sticky top-0">
              <tr>
                {[
                  "Employee ID",
                  "Full Name",
                  "Email",
                  "Position",
                  "Department",
                  "Date Hired",
                  "Status",
                ].map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-4 py-3 text-[#64748B] font-semibold border-b border-slate-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr
                  key={emp.employee_id ?? i}
                  className="border-b border-slate-100"
                >
                  <td className="px-4 py-3 text-slate-600">
                    #{emp.employee_id}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{emp.full_name}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.email}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.position}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.department}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDate(emp.date_hired)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {emp.employment_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            className="px-4 py-2 bg-[#0f52ba] text-white rounded-sm font-semibold hover:bg-[#1D59C1] cursor-pointer"
            onClick={handleConfirm}
          >
            Confirm Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPreviewModal;
