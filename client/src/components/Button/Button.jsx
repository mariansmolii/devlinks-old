import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ className, type, title, disabled, onClick, variant }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.btn, styles[variant], className)}
    >
      {title}
    </button>
  );
};

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};
