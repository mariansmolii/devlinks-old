import { useDispatch } from "react-redux";
import { getLinkData } from "../../store/links/linksSlice";

import PropTypes from "prop-types";
import LinkItem from "./LinkItem/LinkItem";
import options from "../../utils/data/selectData";
import styles from "./LinksList.module.scss";
import validateLinkInput from "../../utils/helpers/validateLinkInput";

const LinksList = ({
  links,
  selectedPlatform,
  setSelectedPlatform,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();

  const handleInput = (e, id, platform) => {
    const { value } = e.target;

    dispatch(getLinkData({ _id: id, url: value.trim() }));

    const { isError, message } = validateLinkInput(value, platform);

    setErrors((prev) => ({
      ...prev,
      [id]: { isError, message },
    }));
  };

  const handleSelectChange = (selectedOption, id) => {
    setSelectedPlatform(selectedOption);

    dispatch(
      getLinkData({
        _id: id,
        platform: selectedOption,
      })
    );
  };

  return (
    <ul className={styles.list}>
      {links.map(({ _id, type, platform, url }, index) => (
        <LinkItem
          key={_id}
          id={_id}
          handleSelectChange={handleSelectChange}
          handleInput={handleInput}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          isError={errors[_id]?.isError}
          options={options}
          type={type}
          platform={platform}
          url={url}
          index={index}
          errorMessage={errors[_id]?.message}
        />
      ))}
    </ul>
  );
};

export default LinksList;

LinksList.propTypes = {
  links: PropTypes.array,
  selectedPlatform: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    iconName: PropTypes.string,
    color: PropTypes.string,
  }),
  setSelectedPlatform: PropTypes.func,
  errors: PropTypes.shape({
    isError: PropTypes.bool,
    message: PropTypes.string,
  }),
  setErrors: PropTypes.func,
};
