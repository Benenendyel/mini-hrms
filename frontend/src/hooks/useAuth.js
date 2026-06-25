import { useState } from "react";
import { useNavigate } from "react-router-dom";

// api
import Auth from "../api/auth";

// utisl
import AuthValidate from "../utils/authValidate";

// context
import { useAuth as useGlobalAuth } from "../contexts/AuthContext";

const useAuth = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useGlobalAuth();

  const handleLogin = async () => {
    const emailError = AuthValidate.email(emailInput);
    const passwordError = AuthValidate.password(passwordInput);

    if (emailError) return setError(emailError);
    if (passwordError) return setError(passwordError);

    setError("");
    setLoading(true);

    const result = await Auth.loginAdmin(emailInput, passwordInput);

    if (result.success) {
      const userData = {
        token: result.dummyToken,
        userName: result.userName,
        role: result.role,
      };

      login(userData);
      navigate("/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    error,
    loading,
    handleLogin,
  };
};

export default useAuth;
