import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import Container from "react-bootstrap/esm/Container";

const Layout = () => {
  return (
    <>
      <Navigationbar />
      <Container fluid>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default Layout;
