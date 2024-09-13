import { Reorder } from "framer-motion";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLinkData, updateLinkIndex } from "../../store/links/linksSlice";

import PropTypes from "prop-types";
import LinkItem from "./LinkItem/LinkItem";
import options from "../../utils/data/selectData";
import validateLinkInput from "../../utils/helpers/validateLinkInput";
import styles from "./LinksList.module.scss";

const LinksList = ({
  links,
  selectedPlatform,
  setSelectedPlatform,
  errors,
  setErrors,
  inputValues,
  setInputValues,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialValues = links.reduce((acc, link) => {
      acc[link._id] = link.url || "";
      return acc;
    }, {});
    setInputValues(initialValues);
  }, [links, setInputValues]);

  const updateErrors = (id, url, platform) => {
    const { isError, message } = validateLinkInput(url, platform);

    setErrors((prev) => ({
      ...prev,
      [id]: { isError, message },
    }));
  };

  const handleInput = (e, id, platform) => {
    const { value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    dispatch(getLinkData({ _id: id, url: value }));

    updateErrors(id, value, platform);
  };

  const handleSelectChange = (selectedOption, id) => {
    setSelectedPlatform(selectedOption);

    dispatch(
      getLinkData({
        _id: id,
        platform: selectedOption,
      })
    );

    const url = inputValues[id];

    updateErrors(id, url, selectedOption);
  };

  const handleReorder = (newOrder) => {
    newOrder.forEach((link, newIndex) => {
      dispatch(updateLinkIndex({ _id: link._id, index: newIndex }));
    });
  };

  return (
    <Reorder.Group
      axis="y"
      onReorder={handleReorder}
      values={links}
      as="ul"
      className={styles.list}
    >
      {links.map((link, index) => (
        <LinkItem
          key={link._id}
          link={link}
          handleSelectChange={handleSelectChange}
          handleInput={handleInput}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          isError={errors[link._id]?.isError}
          options={options}
          index={index}
          errorMessage={errors[link._id]?.message}
          inputValue={inputValues[link._id]}
        />
      ))}
    </Reorder.Group>
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
  inputValues: PropTypes.object,
  setInputValues: PropTypes.func,
};
