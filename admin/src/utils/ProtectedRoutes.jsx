import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext";

const AdminProtectedRoute = ({ children }) => {

  const { adminData, loading } = useContext(adminDataContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!adminData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

