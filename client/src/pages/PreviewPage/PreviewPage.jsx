import LinksListPreview from "../../components/LinksListPreview/LinksListPreview";
import useProfile from "../../hooks/useProfile";
import styles from "./PreviewPage.module.scss";

const PreviewPage = () => {
  const { image, fullName, emailPreview, imagePreview } = useProfile();

  return (
    <>
      <div className={styles.background} />

      <div className={styles.wrapper}>
        {image || imagePreview ? (
          <img src={image || imagePreview} alt="user avatar" />
        ) : (
          <div />
        )}

        <div className={styles.profileInfo}>
          <h2>{fullName}</h2>
          <p>{emailPreview}</p>
        </div>

        <LinksListPreview className={styles.links} showAll={true} />
      </div>
    </>
  );
};

export default PreviewPage;
