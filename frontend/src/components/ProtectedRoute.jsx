import { Navigate, Outlet } from "react-router-dom";

// context
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { credentials } = useAuth();

  return credentials ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
