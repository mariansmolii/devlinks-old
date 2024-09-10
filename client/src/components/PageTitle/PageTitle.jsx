import PropsTypes from "prop-types";
import styles from "./PageTitle.module.scss";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  title: PropsTypes.string.isRequired,
  subtitle: PropsTypes.string.isRequired,
};
