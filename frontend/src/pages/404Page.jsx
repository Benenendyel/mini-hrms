import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-[#0f52ba]">404</h1>
      <p className="text-gray-500 mt-2">
        Page not found. Redirecting you home in{" "}
        <span className="font-semibold ">{countdown}</span>...
      </p>
    </div>
  );
}

export default ErrorPage;
