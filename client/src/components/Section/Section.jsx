import clsx from "clsx";
import PropsTypes from "prop-types";
import styles from "./Section.module.scss";

const Section = ({ children, className }) => {
  return (
    <section className={clsx(styles.section, className)}>{children}</section>
  );
};

export default Section;

Section.propTypes = {
  children: PropsTypes.node.isRequired,
  className: PropsTypes.string,
};
