import { useState } from "react";

// context
import { useAttendanceContext } from "../contexts/AttendanceContext";

//contants
import Icons from "../constants/Icons";

function AddAttendanceModal({ employees, setAddModal }) {
  const [chosenEmployee, setChosenEmployee] = useState(null);
  const [searchBar, setSearchBar] = useState("");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeIn, setTimeIn] = useState(new Date().toTimeString().slice(0, 5));

  const [status, setStatus] = useState("Present");
  const [statusDrop, setStatusDrop] = useState(false);

  const { addTimeIn } = useAttendanceContext();

  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchBar.toLowerCase()),
  );

  const handleAdd = async () => {
    if (!chosenEmployee || !status || !date) return;

    const employee = {
      employeeId: chosenEmployee.employee_id,
      date,
      timeIn,
      status,
    };

    console.log("sending:", employee);
    const result = await addTimeIn(employee);
    console.log(result); // check this first
    if (result.success) setAddModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <div className="bg-white rounded-lg  py-2 w-full max-w-lg">
        <div className="flex flex-row py-2 px-4 justify-between border-b border-b-slate-200 items-center">
          <div>
            <span className="tracking-tight  text-[#0F52BA] text-4xl font-bold mb-4">
              Add Attendance
            </span>
            <p className="text-sm">
              Enter the attendance details for the company member.
            </p>
          </div>
          <button
            className="  px-3 py-1 rounded-sm font-semibold text-center border border-slate-200  hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setAddModal(false)}
          >
            x
          </button>
        </div>
        <div className="flex flex-col py-4 px-4 gap-6 h-[430px] overflow-hidden">
          <div className="flex-none py-2 px-2 border border-slate-200 rounded">
            <input
              type="text"
              className=" outline-none w-full"
              value={searchBar}
              onChange={(e) => {
                setSearchBar(e.target.value);
              }}
              placeholder="Search a name, or id"
            />
          </div>
          <div
            className={`grid ${chosenEmployee ? "grid-cols-2" : "grid-cols-1"} gap-6 flex-1 min-h-0`}
          >
            {chosenEmployee && (
              <div className="flex flex-col h-full animate-fade-in">
                <div className="relative px-3 py-3 border border-slate-200 rounded-md bg-[#f8fafc] mb-2">
                  <button
                    onClick={() => setChosenEmployee(null)}
                    className="absolute right-2 top-2 px-1.5 py-0.5 text-xs text-black rounded-full  hover:bg-[#f8fafc] cursor-pointer"
                  >
                    x
                  </button>
                  <span className="font-semibold block text-slate-800 pr-6">
                    {chosenEmployee.full_name}
                  </span>
                  <p className="text-sm text-slate-500">
                    {chosenEmployee.department}
                  </p>
                </div>
                <div>
                  <div className="flex flex-col-reverse">
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="py-1 px-2 outline-none border border-slate-200"
                    />
                    <label
                      htmlFor="date"
                      className=" text-[#64748B] font-semibold"
                    >
                      Date
                    </label>
                  </div>

                  <div className="flex flex-col-reverse">
                    <input
                      id="timeIn"
                      type="time"
                      value={timeIn}
                      onChange={(e) => setTimeIn(e.target.value)}
                      className="py-1 px-2 outline-none border border-slate-200"
                    />
                    <label
                      htmlFor="timeIn"
                      className=" text-[#64748B] font-semibold"
                    >
                      Time In
                    </label>
                  </div>
                  <div className="relative flex flex-col-reverse">
                    <div
                      className={`${statusDrop ? "flex" : "hidden"} flex-col absolute  bg-white border-slate-200 border px-2 py-2 gap-2 rounded-b-lg w-full z-10 top-full left-0`}
                    >
                      {["Present", "Late", "Absent"]
                        .filter((key) => key !== status)
                        .map((key, index) => (
                          <span
                            key={index}
                            className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                            onClick={() => {
                              setStatus(key);
                              setStatusDrop(false);
                            }}
                          >
                            {key}
                          </span>
                        ))}
                    </div>
                    <div
                      id="status"
                      className="flex flex-row justify-between items-center py-1 px-2 outline-none border hover:bg-[#f8fafc] border-slate-200 cursor-pointer"
                      onClick={() => setStatusDrop(!statusDrop)}
                    >
                      <span>{status}</span>
                      <img
                        className="rotate-180 w-2 h-2"
                        src={Icons.UpArrowIcon}
                      />
                    </div>
                    <label
                      htmlFor="timeIn"
                      className=" text-[#64748B] font-semibold"
                    >
                      Status
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col h-full min-h-0">
              <div className="flex-none flex px-2 py-1 justify-between bg-[#f8fafc] rounded-t-md border border-x-slate-200 border-t-slate-200 border-b-0 text-slate-600 text-xs font-medium">
                <span
                  className={`${chosenEmployee ? "hidden" : "block"} text-sm font-semibold`}
                >
                  Employees List
                </span>
                <span className="flex ">
                  Showing {filteredEmployees.length} results
                </span>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin pr-1 ">
                {filteredEmployees.map((key, index) => (
                  <div
                    className="flex flex-col px-2 py-2 border-b border-slate-200 hover:bg-[#f8fafc]  cursor-pointer "
                    onClick={() => setChosenEmployee(key)}
                    key={index}
                  >
                    <span className="font-semibold">{key.full_name}</span>
                    <span className="text-sm">{key.department}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="px-15 py-2 bg-[#0F52BA] hover:bg-[#0a3d8f] font-semibold text-white rounded-sm cursor-pointer"
              onClick={handleAdd}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAttendanceModal;
