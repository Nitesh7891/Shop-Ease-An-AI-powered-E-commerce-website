import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { userData } = useContext(userDataContext);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
