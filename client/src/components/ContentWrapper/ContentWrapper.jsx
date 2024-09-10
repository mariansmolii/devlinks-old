import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./ContentWrapper.module.scss";

const ContentWrapper = ({ children, className }) => {
  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};

export default ContentWrapper;

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
