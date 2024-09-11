import PropTypes from "prop-types";
import Select, { components } from "react-select";
import Icon from "../Icon/Icon";
import "./CustomSelect.scss";

const Option = (props) => (
  <components.Option {...props}>
    <Icon w={16} iconName={props.data.iconName} />
    <span>{props.data.label}</span>
  </components.Option>
);

const CustomSelect = ({ platformId, handleChange, value, options }) => {
  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <Icon w={16} iconName={value?.iconName} />
      <span>{children}</span>
    </components.SingleValue>
  );

  SingleValue.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({
      iconName: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <Select
      inputId={platformId}
      name="platform"
      value={value}
      options={options}
      isSearchable={false}
      defaultValue={options[0]}
      classNamePrefix="custom-select"
      components={{ Option, SingleValue }}
      onChange={handleChange}
      openMenuOnFocus={true}
      styles={{
        menuList: (base) => ({
          ...base,
          "::-webkit-scrollbar": {
            display: "none",
          },
        }),
      }}
    />
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  platformId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    iconName: PropTypes.string,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      iconName: PropTypes.string,
    })
  ).isRequired,
};

Option.propTypes = {
  data: PropTypes.shape({
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
