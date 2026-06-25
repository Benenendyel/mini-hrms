import { useState } from "react";

// context
import { useEmployeeContext } from "../contexts/EmployeeContext";

// utils
import AddModalValidate from "../utils/addModalValidate";

// constants
import Icons from "../constants/Icons";
import positionsByDepartment from "../constants/positionsByDepartment";

function EditingEmployeeModal({ setEditModal, employeeDetails }) {
  const [fullName, setFullName] = useState(employeeDetails.full_name);
  const [email, setEmail] = useState(employeeDetails.email);
  const [contactNumber, setContactNumber] = useState(
    employeeDetails.contact_number,
  );
  const [department, setDepartment] = useState(employeeDetails.department);
  const [position, setPosition] = useState(employeeDetails.position);
  const [dateHired, setDateHired] = useState(
    employeeDetails.date_hired.split("T")[0],
  );
  const [status, setStatus] = useState(employeeDetails.employment_status);

  const [jobDrop, setJobDrop] = useState(false);
  const [deptDrop, setDeptDrop] = useState(false);
  const [statusDrop, setStatusDrop] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [positionError, setPositionError] = useState("");

  const { loading, editEmployee, deleteEmployee } = useEmployeeContext();

  const availDepartments = Object.keys(positionsByDepartment).filter(
    (key) => key !== department,
  );
  const availPositions = positionsByDepartment[department];

  const hasChanges =
    fullName !== employeeDetails.full_name ||
    email !== employeeDetails.email ||
    contactNumber !== employeeDetails.contact_number ||
    department !== employeeDetails.department ||
    position !== employeeDetails.position ||
    dateHired !== employeeDetails.date_hired.split("T")[0] ||
    status !== employeeDetails.employment_status;

  const handleEdit = async () => {
    if (!hasChanges) return;

    const fullNameErr = AddModalValidate.fullName(fullName);
    const emailErr = AddModalValidate.emailAddress(email);
    const contactErr = AddModalValidate.contact(contactNumber);
    const positionErr = AddModalValidate.jobPosition(position);

    setFullNameError(fullNameErr);
    setEmailError(emailErr);
    setContactError(contactErr);
    setPositionError(positionErr);

    if (fullNameErr || emailErr || contactErr || positionErr) return;

    const employee = {
      employeeId: employeeDetails.employee_id,
      fullName,
      email,
      contactNumber,
      position,
      department,
      dateHired,
      status,
    };

    const result = await editEmployee(employee);
    if (result.success) setEditModal(false);
  };

  const handleDelete = async () => {
    const result = await deleteEmployee(employeeDetails.employee_id);
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
              Enter the official details for the new company member.
            </p>
          </div>
          <button
            className="  px-3 py-1 rounded-sm font-semibold text-center border border-slate-200  hover:bg-[#f8fafc] cursor-pointer"
            onClick={() => setEditModal(false)}
          >
            x
          </button>
        </div>
        <div className="grid grid-cols-2 py-4 px-4  gap-6">
          <div className="flex flex-col-reverse">
            <input
              id="fullName"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="e.g. Bilbo Baggins"
            />
            <div className="flex flex-col">
              <label
                className=" text-[#64748B] font-semibold"
                htmlFor="fullName"
              >
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              {fullNameError && (
                <span className="text-red-500 text-xs">{fullNameError}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse">
            <input
              id="emailAddress"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="local@domain.com"
            />

            <div className="flex flex-col">
              <label
                className=" text-[#64748B] font-semibold"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              {emailError && (
                <span className="text-red-500 text-xs">{emailError}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse">
            <input
              id="contactNumber"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
              type="text"
              placeholder="0000-000-0000"
            />
            <div className="flex flex-col">
              <label
                className=" text-[#64748B] font-semibold"
                htmlFor="contactNumber"
              >
                Contact Number
              </label>
              {contactError && (
                <span className="text-red-500 text-xs">{contactError}</span>
              )}
            </div>
          </div>

          <div className="relative flex flex-col-reverse">
            <div
              className={`${deptDrop ? "flex" : "hidden"} z-10 bg-white w-full border border-slate-200 rounded-b-md flex-col px-2 py-2 gap-2 absolute top-full left-0`}
              onMouseLeave={() => setDeptDrop(false)}
            >
              {availDepartments.map((key, index) => (
                <div
                  className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                  onClick={() => {
                    setDepartment(key);
                    setDeptDrop(false);
                  }}
                  onBlur={() => setDeptDrop(false)}
                  key={index}
                >
                  {key}
                </div>
              ))}
            </div>
            <div
              id="department"
              className=" py-1 px-2 flex flex-row justify-between items-center outline-none border cursor-pointer border-slate-200 hover:bg-[#f8fafc]"
              onClick={() => setDeptDrop(!deptDrop)}
            >
              <span>{department}</span>
              <img className="rotate-180 w-2 h-2" src={Icons.UpArrowIcon} />
            </div>
            <label
              className=" text-[#64748B] font-semibold"
              htmlFor="department"
            >
              Department
            </label>
          </div>

          <div className="relative flex flex-col-reverse">
            <div
              className={`${jobDrop ? "flex" : "hidden"} z-10 bg-white w-full border border-slate-200 rounded-b-md flex-col px-2 py-2 gap-2 absolute top-full left-0`}
              onMouseLeave={() => setJobDrop(false)}
            >
              {availPositions
                .filter((pos) => pos !== position)
                .map((pos) => (
                  <div
                    className="hover:bg-[#f8fafc] py-1 px-2 cursor-pointer"
                    onClick={() => {
                      setPosition(pos);
                      setJobDrop(false);
                    }}
                    key={pos}
                  >
                    {pos}
                  </div>
                ))}
            </div>
            <div
              id="position"
              className="py-1 px-2 flex flex-row justify-between items-center outline-none border cursor-pointer border-slate-200 hover:bg-[#f8fafc]"
              onClick={() => setJobDrop(!jobDrop)}
            >
              <span>{position || "Select position"}</span>
              <img className="rotate-180 w-2 h-2" src={Icons.UpArrowIcon} />
            </div>
            <div className="flex flex-col">
              <label
                className=" text-[#64748B] font-semibold"
                htmlFor="position"
              >
                Position
              </label>
              {positionError && (
                <span className="text-red-500 text-xs">{positionError}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse">
            <input
              id="dateHired"
              className="py-1 px-2 outline-none border border-slate-200"
              onChange={(e) => setDateHired(e.target.value)}
              value={dateHired}
              type="date"
              placeholder="YYYY-MM-DD"
            />
            <div className="flex flex-col">
              <label
                className=" text-[#64748B] font-semibold"
                htmlFor="dateHired"
              >
                Date Hired
              </label>
              {emailError && (
                <span className="text-red-500 text-xs">{emailError}</span>
              )}
            </div>
          </div>
          <div className="relative flex flex-col-reverse">
            {
              <div
                className={`${statusDrop ? "flex" : "hidden"} z-10  bg-white w-full border border-slate-200 rounded-b-md flex-col px-2 py-2 gap-2 absolute top-full left-0`}
                onMouseLeave={() => setStatusDrop(false)}
              >
                {["Active", "Resigned", "On Leave"]
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
            }
            <div
              className="py-1 px-2 flex flex-row justify-between items-center outline-none border cursor-pointer border-slate-200 hover:bg-[#f8fafc]"
              onClick={() => setStatusDrop(!statusDrop)}
            >
              <span>{status || "Select status"}</span>
              <img className="rotate-180 w-2 h-2" src={Icons.UpArrowIcon} />
            </div>
            <div className="flex flex-col">
              <label className="text-[#64748B] font-semibold">
                Employment Status
              </label>
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

export default EditingEmployeeModal;
