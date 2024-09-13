import { useId } from "react";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteLinkLocally } from "../../../store/links/linksSlice";
import { deleteLink } from "../../../store/links/linksOperations";

import clsx from "clsx";
import PropTypes from "prop-types";
import Input from "../../Input/Input";
import Icon from "../../Icon/Icon";
import CustomSelect from "../../CustomSelect/CustomSelect";
import getLinkSheme from "../../../utils/schemas/linkScheme";
import getLinkPlaceholder from "../../../utils/helpers/getLinkPlaceholder";
import styles from "./LinkItem.module.scss";
import useLinks from "../../../hooks/useLinks";
import useShadow from "../../../hooks/useShadow";

const LinkItem = ({
  handleSelectChange,
  selectedPlatform,
  options,
  handleInput,
  isError,
  index,
  errorMessage,
  link,
  inputValue,
}) => {
  const { _id: id, platform, type } = link;

  const platformId = useId();
  const linkId = useId();

  const dispatch = useDispatch();

  const { isLinksInDB } = useLinks();

  const handleDelete = async () => {
    try {
      if (isLinksInDB && type !== "new") {
        await dispatch(deleteLink({ _id: id }));
      }

      dispatch(deleteLinkLocally(id));
    } catch (error) {
      console.log(error);
    }
  };

  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useShadow(y);

  return (
    <Reorder.Item
      value={link}
      id={id}
      className={styles.item}
      dragListener={false}
      dragControls={dragControls}
      style={{ boxShadow, y }}
    >
      <div className={styles.wrapper}>
        <div onPointerDown={(event) => dragControls.start(event)}>
          <Icon w={12} h={6} iconName="icon-drag-and-drop" />
          <p>Link #{index + 1}</p>
        </div>
        <button type="button" onClick={handleDelete}>
          Remove
        </button>
      </div>

      <div className={styles.selectWrapper}>
        <label htmlFor={platformId}>Platform</label>
        <CustomSelect
          platformId={platformId}
          id={id}
          handleChange={(selectedOption) =>
            handleSelectChange(selectedOption, id)
          }
          value={platform || selectedPlatform}
          options={options}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          id={linkId}
          name="linkUrl"
          type="text"
          value={inputValue || ""}
          onChange={(e) => handleInput(e, id, platform)}
          label={"Link"}
          iconName={"icon-link"}
          placeholder={getLinkPlaceholder(platform)}
          pattern={getLinkSheme(platform)}
          error={isError}
          className={styles.container}
          inputStyle={clsx(styles.input, { [styles.error]: isError })}
        />

        {isError && <p>{errorMessage}</p>}
      </div>
    </Reorder.Item>
  );
};

export default LinkItem;

LinkItem.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  selectedPlatform: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    iconName: PropTypes.string,
    color: PropTypes.string,
  }),
  options: PropTypes.array.isRequired,
  handleInput: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  index: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  link: PropTypes.shape({
    _id: PropTypes.string,
    platform: PropTypes.object,
    url: PropTypes.string,
    index: PropTypes.number,
    type: PropTypes.string,
  }),
  inputValue: PropTypes.string,
};
