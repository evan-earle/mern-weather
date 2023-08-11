import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";
import userAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Auth = () => {
  const { auth } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};
