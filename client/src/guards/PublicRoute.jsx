import { useLocation, Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return !token ? children : <Navigate to={location.state ?? "/"} />;
};

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
