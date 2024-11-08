import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./comman/header";
import Footer from "./comman/footer";
// import "./css/comman.scss";


const Layout = () => {
  return (
    <>
      <Header />
      <main className="my-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
