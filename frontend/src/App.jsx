import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// components
import NavigationBar from "./components/NavigationBar";
import SideNavigationBar from "./components/SideNavigationBar";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import ErrorPage from "./pages/404Page";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";
import SalaryPage from "./pages/SalaryPage";
import PayrollPage from "./pages/PayrollPage";

// contexts
import { useAuth } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const { credentials } = useAuth();

  const showNavbar = [
    "/dashboard",
    "/employee",
    "/attendance",
    "/salaries",
    "/payroll",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {showNavbar && <NavigationBar />}
      {showNavbar && <SideNavigationBar />}

      <main className="flex-1">
        <Routes>
          <Route
            index
            element={
              credentials ? <Navigate to="/dashboard" replace /> : <AuthPage />
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="salaries" element={<SalaryPage />} />
            <Route path="payroll" element={<PayrollPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
