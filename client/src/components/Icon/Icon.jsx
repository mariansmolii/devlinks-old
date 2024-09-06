import PropTypes from "prop-types";

const Icon = ({ className, w, h = w, iconName }) => {
  return (
    <svg className={className} width={w} height={h}>
      <use href={`/icons/sprite.svg#${iconName}`}></use>
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  w: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  h: PropTypes.number,
};
