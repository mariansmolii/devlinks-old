import clsx from "clsx";
import Icon from "../Icon/Icon";
import LinksListPreview from "../LinksListPreview/LinksListPreview";
import useProfile from "../../hooks/useProfile";
import styles from "./Aside.module.scss";

const Aside = () => {
  const { image, imagePreview, fullName, emailPreview, lastName, firstName } =
    useProfile();

  return (
    <aside className={styles.aside}>
      {imagePreview || image ? (
        <img
          src={imagePreview || image}
          className={styles.img}
          alt="user avatar"
        />
      ) : (
        <div className={styles.circle} />
      )}

      <div className={styles.infoWrapper}>
        <div
          className={clsx(styles.fullNameBlock, {
            [styles.isFullName]: lastName || firstName,
          })}
        >
          {fullName && <h2>{fullName}</h2>}
        </div>
        <div
          className={clsx(styles.emailBlock, {
            [styles.isEmail]: emailPreview,
          })}
        >
          <p>{emailPreview}</p>
        </div>
      </div>
      <Icon iconName="icon-illustration-phone-mockup" w={307} h={631} />

      <LinksListPreview />
    </aside>
  );
};

export default Aside;
