import { useLocation, Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={location} />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
