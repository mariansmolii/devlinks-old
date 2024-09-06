import { Link } from "react-router-dom";

import clsx from "clsx";
import AuthLogo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.scss";

const HeaderContent = () => {
  return (
    <>
      <Link to="/">
        <AuthLogo />
      </Link>

      <Navigation />

      <Link to="/preview" className={clsx(styles.navLink)}>
        <Icon iconName="icon-preview" w={20} />
        <p>Preview</p>
      </Link>
    </>
  );
};

export default HeaderContent;
