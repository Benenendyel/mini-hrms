import { useNavigate } from "react-router-dom";
import { useState } from "react";

//contants
import Icons from "../constants/Icons";

// contexts
import { useAuth } from "../contexts/AuthContext";
import { useUI } from "../contexts/UIContext";

function NavigationBar() {
  const [dropDown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const { credentials, logout } = useAuth();
  const { sideBarOpen, setSideBarOpen, toggleSideBar } = useUI();

  return (
    <div className="fixed top-0 left-0 z-40 w-full py-3 px-5 border-b-slate-200 border bg-white  flex justify-between items-center">
      <div className="flex flex-row items-center gap-4">
        <div
          className="p-2 hover:bg-[#f8fafc]  transition-all duration-100 rounded-md  cursor-pointer"
          onClick={() => {
            toggleSideBar();
            if (dropDown) setDropdown(false);
          }}
        >
          <img className="w-7 h-7" src={Icons.BurgerIcon} />
        </div>
        <div
          className="hidden md:flex flex-row items-center gap-3 p-0 cursor-pointer"
          onClick={() => {
            navigate("/dashboard", { replace: true });
          }}
        >
          <img className="w-7 h-7 " src={Icons.LogoIcon} />
          <span className="font-bold text-xl select-none text-[#0F52BA]">
            Mini-HRMS
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-end justify-center">
              <span className="font-bold text-lg text-[#191c1e]">
                {credentials?.userName}
              </span>
              <span className="text-[#64748B]">{credentials?.role}</span>
            </div>
          </div>
          <div className="relative">
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (sideBarOpen) setSideBarOpen(false);
                setDropdown(!dropDown);
              }}
            >
              <img className="w-10 h-10 rounded-full " src={Icons.UserIcon} />
              <div className="absolute top-[80%] right-0 bg-[#f8fafc] px-1 py-1 rounded-full">
                <img
                  className={`${dropDown ? "rotate-180" : "rotate-0"} w-2 h-2 transition-all duration-100`}
                  src={Icons.UpArrowIcon}
                />
              </div>
            </div>
            <ul
              className={`${dropDown ? "flex" : "hidden"} absolute flex-col rounded-lg gap-1 right-0 top-[110%] bg-white border-slate-200 border px-3 py-2 w-40 md:w-70`}
            >
              {["Settings", "Logout"].map((key, index) => (
                <li
                  className="cursor-pointer hover:bg-[#f8fafc] text-[#191c1e] py-2 px-2"
                  onClick={(e) => {
                    e.stopPropagation();

                    if (key === "Logout") {
                      setSideBarOpen(false);
                      logout();
                      navigate("/", { replace: true });
                    }
                  }}
                  key={index}
                >
                  {key}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
