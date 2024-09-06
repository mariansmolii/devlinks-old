import PropTypes from "prop-types";
import styles from "./InfoPanel.module.scss";

const InfoPanel = ({ title, text }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
    </>
  );
};

export default InfoPanel;

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
