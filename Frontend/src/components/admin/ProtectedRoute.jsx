import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) return null; // wait until auth finishes

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;