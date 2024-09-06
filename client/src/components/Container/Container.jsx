import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Container.module.scss";

const Container = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
