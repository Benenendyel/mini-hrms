// context
import { useAuth } from "../contexts/AuthContext";
import { useEmployeeContext } from "../contexts/EmployeeContext";
import { useSalaryContext } from "../contexts/SalaryContext";

// utils
import formatDate from "../utils/formatDate";

function Dashboard() {
  const { credentials } = useAuth();
  const { employees, employeeLoading } = useEmployeeContext();
  const { salaries, salaryLoading } = useSalaryContext();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount || 0);
  };

  const totalMonthlyPayroll = salaries.reduce(
    (acc, salary) => acc + parseFloat(salary.net_salary || 0),
    0,
  );

  const boxInfos = [
    {
      label: "Total Employees",
      valueAmount: employees.length,
      classNames: " text-[#0F52BA]",
    },
    {
      label: "Active Employees",
      valueAmount: employees.filter((e) => e.employment_status === "Active")
        .length,
      classNames: "text-[#fa990e]",
    },
    {
      label: "On Leave",
      valueAmount: employees.filter((e) => e.employment_status === "On Leave")
        .length,
      classNames: "text-[#c2391e]",
    },
    {
      label: "Total Monthly Payroll",
      valueAmount: formatCurrency(totalMonthlyPayroll),
      classNames: " text-[#1d6f42]",
    },
  ];

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.date_hired) - new Date(a.date_hired))
    .slice(0, 5);

  const recentPayroll = [...salaries].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="flex flex-col px-5 md:px-10 pt-25  md:h-screen gap-4 pb-6">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <span className="text-4xl font-bold tracking-tight text-[#0F52BA]">
            HR Dashboard
          </span>
          <p className="text-sm tracking-wide">
            Welcome back, {credentials?.userName}. Here's what's happening
            today.
          </p>
        </div>
      </div>

      {employeeLoading || salaryLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="w-10 h-10 border-4 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {boxInfos.map((key, index) => (
              <li
                key={index}
                className={`flex flex-col gap-2 p-6 rounded-xl bg-white border border-slate-200 ${key.classNames}`}
              >
                <span className="text-sm text-gray-500">{key.label}</span>
                <p className="text-3xl font-bold">{key.valueAmount}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
            <div className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200">
                <span className="font-bold text-[#0F52BA] text-lg">
                  Recently Hired
                </span>
                <p className="text-sm text-gray-500">
                  Latest additions to the team.
                </p>
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-slate-200 text-sm text-[#64748B] bg-[#f8fafc] font-semibold">
                  <span>Full Name</span>
                  <span>Position</span>
                  <span>Date Hired</span>
                </div>
                <div className="flex flex-col overflow-y-auto">
                  {recentEmployees.map((employee, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-slate-200 text-sm text-slate-600 bg-white items-center flex-1"
                    >
                      <span>{employee.full_name}</span>
                      <span>{employee.position}</span>
                      <span>{formatDate(employee.date_hired)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200">
                <span className="font-bold text-[#0F52BA] text-lg">
                  Recent Payroll
                </span>
                <p className="text-sm text-gray-500">
                  Latest salary computations.
                </p>
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-slate-200 text-sm text-[#64748B] bg-[#f8fafc] font-semibold">
                  <span>Full Name</span>
                  <span>Department</span>
                  <span className="text-[#0F52BA]">Net Salary</span>
                </div>
                <div className="flex flex-col overflow-y-auto">
                  {recentPayroll.map((salary, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-slate-200 text-sm text-slate-600 bg-white items-center flex-1"
                    >
                      <span>{salary.full_name}</span>
                      <span>{salary.department}</span>
                      <span className="font-semibold text-slate-800">
                        {formatCurrency(salary.net_salary)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
