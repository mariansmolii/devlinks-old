import { useId } from "react";
import { useDispatch } from "react-redux";
import { deleteLinkLocally } from "../../../store/links/linksSlice";
import { deleteLink } from "../../../store/links/linksOperations";

import PropTypes from "prop-types";
import Input from "../../Input/Input";
import Icon from "../../Icon/Icon";
import CustomSelect from "../../CustomSelect/CustomSelect";
import getLinkSheme from "../../../utils/schemas/linkScheme";
import ContentWrapper from "../../ContentWrapper/ContentWrapper";
import getLinkPlaceholder from "../../../utils/helpers/getLinkPlaceholder";
import styles from "./LinkItem.module.scss";
import useLinks from "../../../hooks/useLinks";
import clsx from "clsx";

const LinkItem = ({
  id,
  handleSelectChange,
  selectedPlatform,
  options,
  platform,
  handleInput,
  isError,
  type,
  url,
  index,
  errorMessage,
}) => {
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

  return (
    <ContentWrapper Tag="li">
      <div className={styles.wrapper}>
        <div>
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
          value={url || ""}
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
    </ContentWrapper>
  );
};

export default LinkItem;

LinkItem.propTypes = {
  id: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  selectedPlatform: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    iconName: PropTypes.string,
    color: PropTypes.string,
  }),
  options: PropTypes.array.isRequired,
  platform: PropTypes.object,
  handleInput: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  type: PropTypes.string,
  url: PropTypes.string,
  index: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
};
