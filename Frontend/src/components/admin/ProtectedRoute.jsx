import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import store from "../../redux/store";
const ProtectedRoute = ({ children }) => {
  return children;
};

export default ProtectedRoute;