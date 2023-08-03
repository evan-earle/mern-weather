import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};
