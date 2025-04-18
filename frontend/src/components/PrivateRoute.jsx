import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
