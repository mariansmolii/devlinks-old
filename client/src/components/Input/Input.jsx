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
  labelError = true,
  pattern,
  inputStyle,
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, {
            [styles.error]: error && labelError,
          })}
        >
          {label}
        </label>
      )}
      <div className={styles.input}>
        {iconName && <Icon iconName={iconName} w={16} />}
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(inputStyle, { [styles.error]: error })}
          pattern={pattern}
        />
      </div>
    </div>
  );
};

export default Input;

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  iconName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  labelError: PropTypes.bool,
  pattern: PropTypes.instanceOf(RegExp),
  inputStyle: PropTypes.string,
};
