import clsx from "clsx";
import PropsTypes from "prop-types";
import Icon from "../Icon/Icon";
import styles from "./Uploader.module.scss";
import useProfile from "../../hooks/useProfile";

const Uploader = ({ handleImageChange }) => {
  const { image, imagePreview } = useProfile();

  return (
    <div className={styles.uploader}>
      {imagePreview || image ? (
        <>
          <img src={imagePreview || image} alt="user avatar" />
          <div
            className={clsx(styles.icon, {
              [styles.isImage]: !!imagePreview || !!image,
            })}
          >
            <Icon iconName="icon-upload-image" w={40} />
            <p>Change Image</p>
          </div>
        </>
      ) : (
        <div className={styles.icon}>
          <Icon iconName="icon-upload-image" w={40} />
          <p>+ Upload Image</p>
        </div>
      )}

      <input
        type="file"
        name="imageUploader"
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default Uploader;

Uploader.propTypes = {
  handleImageChange: PropsTypes.func.isRequired,
};
