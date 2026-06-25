import { useState } from "react";

// custom hooks
import useAuth from "../hooks/useAuth";

// constants
import Images from "../constants/Images";
import Icons from "../constants/Icons";

function AuthPage() {
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    error,
    success,
    loading,
    handleLogin,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" flex h-screen flex-col md:flex-row">
      <div className=" flex min-w-0 relative md:flex-1 bg-white overflow-hidden h-90 md:h-auto">
        <img
          className="w-full h-full object-left object-cover"
          src={Images.Auth_BG}
        />
        <div className="absolute w-full h-full bg-[#0F52BA]/60 backdrop-blur-xs"></div>
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          src={Images.Illustration_1}
        />
      </div>

      <div className=" flex flex-1 md:flex-none md:w-140 px-10 shrink-0  justify-center items-center">
        {loading ? (
          <div className="w-10 h-10 border-4 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col">
              <span className="font-bold text-4xl md:text-5xl  text-[#191c1e] ">
                Welcome back
              </span>
              <p className="text-[#434653]">
                Please enter your credentials to access the admin dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col-reverse gap-1">
                <div className="flex flex-row border items-center border-[#c3c6d5] py-3 gap-3 px-3 rounded-md">
                  <img className="w-4 h-4" src={Icons.EmailIcon} />
                  <input
                    id="emailInput"
                    className="w-full outline-none"
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                  />
                </div>
                <label
                  htmlFor="emailInput"
                  className="font-semibold text-[#434653]"
                >
                  Email Address
                </label>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <div className="flex flex-row border items-center border-[#c3c6d5] py-3 gap-3 px-3 rounded-md">
                  <img className="w-4 h-4" src={Icons.LockIcon} />
                  <input
                    id="passwordInput"
                    className="w-full outline-none"
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="password"
                  />
                  <img
                    className={`${showPassword ? "hidden" : "flex"} w-6 h-6 cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                    src={Icons.HideIcon}
                  />
                  <img
                    className={`${showPassword ? "flex" : "hidden"} w-6 h-6 cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                    src={Icons.ViewIcon}
                  />
                </div>
                <label
                  htmlFor="passwordInput"
                  className="font-semibold text-[#434653]"
                >
                  Password
                </label>
              </div>
              <div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
              </div>
              <button
                className="bg-[#0F52BA] hover:bg-[#1D59C1] rounded-md mt-5 py-5 text-white font-semibold cursor-pointer active:bg-[#002C6F]"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
