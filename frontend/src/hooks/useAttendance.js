import { useState, useEffect } from "react";

// api
import attendanceApi from "../api/attendance";

const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [lightSwitch, setLightSwitch] = useState(false);
  const [attendanceLoading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await attendanceApi.getAttendances();

      setAttendance(data.attendance);
      setLoading(false);
    } catch (error) {
      return { message: error.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  const addTimeIn = async (attendance) => {
    try {
      const data = await attendanceApi.addTimeIn(attendance);
      setLightSwitch(!lightSwitch);

      return data;
    } catch (error) {
      return { message: error.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  const editAttendance = async (attendance) => {
    try {
      const data = await attendanceApi.editAttendance(attendance);
      setLightSwitch(!lightSwitch);

      return data;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  const deleteAttendance = async (id) => {
    try {
      const data = await attendanceApi.deleteAttendance(id);
      setLightSwitch(!lightSwitch);

      return data;
    } catch (error) {
      return { message: error.message, success: false };
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [lightSwitch]);

  return {
    attendance,
    attendanceLoading,
    addTimeIn,
    editAttendance,
    deleteAttendance,
  };
};

export default useAttendance;
