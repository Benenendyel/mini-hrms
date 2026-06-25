import { createContext, useContext } from "react";

// hooks
import useAttendance from "../hooks/useAttendance";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const attendance = useAttendance();
  return (
    <AttendanceContext.Provider value={attendance}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendanceContext = () => useContext(AttendanceContext);
