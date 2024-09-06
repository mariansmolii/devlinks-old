import clsx from "clsx";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import styles from "./Input.module.scss";

const Input = ({
  id,
  label,
  placeholder,
  className,
  value,
  name,
  type,
  onChange,
  onBlur,
  iconName,
  error,
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <label
        htmlFor={id}
        className={clsx(styles.label, { [styles.error]: error })}
      >
        {label}
      </label>
      <div className={styles.input}>
        <Icon iconName={iconName} w={16} />
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx({ [styles.error]: error })}
        />
      </div>
    </div>
  );
};

export default Input;

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  error: PropTypes.string,
};
