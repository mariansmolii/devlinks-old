import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default MainLayout;
