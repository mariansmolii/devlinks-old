import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import styles from "./AuthPrompt.module.scss";

const AuthPrompt = ({ text, path, label }) => {
  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
      <Link to={path}>{label}</Link>
    </div>
  );
};

export default AuthPrompt;

AuthPrompt.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
