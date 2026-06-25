import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

// context providers
import { AuthProvider } from "./contexts/AuthContext";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import { AttendanceProvider } from "./contexts/AttendanceContext";
import { SalaryProvider } from "./contexts/SalaryContext";
import { PayrollProvider } from "./contexts/PayrollContext";
import { UIProvider } from "./contexts/UIContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <AttendanceProvider>
            <SalaryProvider>
              <PayrollProvider>
                <UIProvider>
                  <App />
                </UIProvider>
              </PayrollProvider>
            </SalaryProvider>
          </AttendanceProvider>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
