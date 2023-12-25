import { Outlet } from "react-router-dom";
import React from "react";

import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

function DefaultLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default DefaultLayout;
