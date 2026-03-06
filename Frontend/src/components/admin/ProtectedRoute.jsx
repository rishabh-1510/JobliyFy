import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import store from "../../redux/store";
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();

  if (!user || user.role !== "recruiter") {
    // prevent redirect loop
    if (location.pathname !== "/login") {
      return <Navigate to="/login" replace />;
    }
    return null;
  }

  return children;
};

export default ProtectedRoute;