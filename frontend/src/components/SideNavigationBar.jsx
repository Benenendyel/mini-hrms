import { useLocation, useNavigate } from "react-router-dom";

// constants
import Icons from "../constants/Icons";

// context
import { useUI } from "../contexts/UIContext";

function SideNavigationBar() {
  const { sideBarOpen, toggleSideBar } = useUI();

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Employee Management", path: "/employee" },
    { label: "Salary Management", path: "/salaries" },
    { label: "Attendance Management", path: "/attendance" },
    { label: "Payroll", path: "/payroll" },
  ];

  return (
    <div
      className={`${sideBarOpen ? "left-0" : "-left-999"} transition-all duration-100 fixed top-0 bottom-0 z-45 h-full py-3 px-5  w-70 border-slate-200 border bg-white  flex flex-col justify-start items-center`}
    >
      <div className="w-full flex justify-end mb-5">
        <div
          className="p-2 hover:bg-[#f8fafc]  border border-slate-200  transition-all duration-100 rounded-md cursor-pointer"
          onClick={toggleSideBar}
        >
          <img className="w-7 h-7 scale-x-[-1]" src={Icons.ExitIcon} />
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mb-3">
        <div className="flex flex-row items-center gap-3 p-0">
          <img className="w-7 h-7 " src={Icons.LogoIcon} />
          <span className="font-bold text-xl select-none text-[#0F52BA]">
            Mini-HRMS
          </span>
        </div>
      </div>
      <ul className="w-full flex flex-col gap-2">
        {navItems.map((key, index) => (
          <li
            className={`py-2 cursor-pointer flex-1 px-2 rounded-sm transition-all duration-100
      ${
        location.pathname === key.path
          ? "bg-[#0F52BA] text-white font-semibold"
          : "hover:bg-[#f8fafc] text-[#191c1e]"
      }`}
            onClick={() => {
              navigate(key.path);
              toggleSideBar();
            }}
            key={index}
          >
            {key.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigationBar;
