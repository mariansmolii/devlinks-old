import PropsTypes from "prop-types";
import styles from "./Section.module.scss";

const Section = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default Section;

Section.propTypes = {
  children: PropsTypes.node.isRequired,
};
