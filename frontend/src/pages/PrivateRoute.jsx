// PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;