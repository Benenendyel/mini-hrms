import { useState } from "react";

// context
import { useAttendanceContext } from "../contexts/AttendanceContext";

// constants
import Icons from "../constants/Icons";

function EditingAttendanceModal({ setEditModal, attendanceDetails }) {
  const [fullName, setFullName] = useState(attendanceDetails.full_name);
  const [date, setDate] = useState(
    attendanceDetails.date ? attendanceDetails.date.split("T")[0] : "",
  );
  const [timeIn, settimeIn] = useState(attendanceDetails.time_in);
  const [timeOut, setTimeOut] = useState(attendanceDetails.time_out);
  const [status, setStatus] = useState(attendanceDetails.status);

  const [statusDrop, setStatusDrop] = useState(false);

  const [dateError, setDateError] = useState("");
  const [timeInError, setTimeInError] = useState("");
  const [statusError, setStatusError] = useState("");

  const { editAttendance, deleteAttendance } = useAttendanceContext();

  const hasChanges =
    date !== attendanceDetails.date ||
    timeIn !== attendanceDetails.time_in ||
    timeOut !== attendanceDetails.time_out ||
    status !== attendanceDetails.status;

  const handleEdit = async () => {
    if (!hasChanges) return;

    const dateErr = !date ? "Date is required" : "";
    const timeInErr = !timeIn ? "Time in is required" : "";
    const statusErr = !status ? "Status is required" : "";

    setDateError(dateErr);
    setTimeInError(timeInErr);
    setStatusError(statusErr);

    if (dateErr || timeInErr || statusErr) return;

    const updatedAttendance = {
      id: attendanceDetails.id,
      date,
      timeIn,
      timeOut,
      status,
    };

    const result = await editAttendance(updatedAttendance);
    if (result && result.success) setEditModal(false);
  };

  const handleDelete = async () => {
    const result = await deleteAttendance(attendanceDetails.id);
    if (result.success) setEditModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <div className="bg-white rounded-lg  py-2 w-full max-w-lg ">
        <div className="flex flex-row py-2 px-4 justify-between border-b border-b-slate-200 items-center">
          <div>
            <span className="tracking-tight  text-[#0F52BA] text-4xl font-bold mb-4">
              Edit General Info
            </span>
            <p className="text-sm">
              Manipulate the attendance of the company member.
            </p>
          </div>
          <button
            className="  px-3 py-1 rounded-sm font-semibold text-center border border-slate-200  hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setEditModal(false)}
          >
            x
          </button>
        </div>

        <div className="grid grid-cols-2 py-4 px-4 gap-6">
          <div className="flex flex-col-reverse">
            <input
              id="fullName"
              className="py-1 px-2 outline-none border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              value={fullName}
              type="text"
              readOnly
            />
            <div className="flex flex-col">
              <label
                className="text-[#64748B] font-semibold"
                htmlFor="fullName"
              >
                Full Name
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse">
            <input
              id="date"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="date"
            />
            <div className="flex flex-col">
              <label className="text-[#64748B] font-semibold" htmlFor="date">
                Date
              </label>
              {dateError && (
                <span className="text-red-500 text-xs">{dateError}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse">
            <input
              id="timeIn"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => settimeIn(e.target.value)} // Matches your settimeIn variable name
              value={timeIn}
              type="time"
            />
            <div className="flex flex-col">
              <label className="text-[#64748B] font-semibold" htmlFor="timeIn">
                Time In
              </label>
              {timeInError && (
                <span className="text-red-500 text-xs">{timeInError}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse">
            <input
              id="timeOut"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setTimeOut(e.target.value)}
              value={timeOut || ""}
              type="time"
            />
            <div className="flex flex-col">
              <label className="text-[#64748B] font-semibold" htmlFor="timeOut">
                Time Out
              </label>
            </div>
          </div>

          {/* Status Dropdown Field */}
          <div className="relative flex flex-col-reverse">
            <div
              className={`${statusDrop ? "flex" : "hidden"} z-10 bg-white w-full border border-slate-200 rounded-b-md flex-col px-2 py-2 gap-2 absolute top-full left-0`}
              onMouseLeave={() => setStatusDrop(false)}
            >
              {["Present", "Late", "Absent", "On Leave"]
                .filter((key) => key !== status)
                .map((key, index) => (
                  <div
                    className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                    onClick={() => {
                      setStatus(key);
                      setStatusDrop(false);
                    }}
                    key={index}
                  >
                    {key}
                  </div>
                ))}
            </div>
            <div
              id="status"
              className="py-1 px-2 flex flex-row justify-between items-center outline-none border cursor-pointer border-slate-200 hover:bg-[#f8fafc]"
              onClick={() => setStatusDrop(!statusDrop)}
            >
              <span>{status || "Select status"}</span>
              <img className="rotate-180 w-2 h-2" src={Icons.UpArrowIcon} />
            </div>
            <div className="flex flex-col">
              <label className="text-[#64748B] font-semibold" htmlFor="status">
                Status
              </label>
              {statusError && (
                <span className="text-red-500 text-xs">{statusError}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end px-4 py-2 gap-2 ">
          <button
            className="px-3 py-2 bg-[#c2391e] hover:bg-[#0a3d8f] font-semibold text-white rounded-sm cursor-pointer"
            onClick={handleDelete}
          >
            Delete Employee
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

export default EditingAttendanceModal;
