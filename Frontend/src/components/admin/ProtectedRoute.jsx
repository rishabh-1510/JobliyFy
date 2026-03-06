import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();

  // not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // wrong role
  if (user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;