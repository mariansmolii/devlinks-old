import { Outlet, useLocation } from "react-router-dom";

import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import Aside from "../../components/Aside/Aside";
import useScreenSize from "../../hooks/useScreenSize";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { width } = useScreenSize();

  const showAside = ["/", "/profile"].includes(pathname) && width >= 1440;

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Container className={styles.container}>
          {showAside && <Aside />}

          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default MainLayout;
