import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

function ProtectedRoutes({ children }) {

  const user = useAuthStore((state) => state.user);

  const storedUser = localStorage.getItem("user");

  if (!user && !storedUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoutes;