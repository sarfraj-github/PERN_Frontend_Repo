import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../login";
import Signup from "../signup";
import Layout from "../layout/layout";
import Home from "../layout/pages/home";
import Peopel from "../layout/pages/peoples";
import UserDetails from "../layout/pages/userDetails";

export default function MainRouteComponent() {
  // let user = sessionStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" exact element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/peoples" element={<Peopel />} />
            <Route path="/userDetails" element={<UserDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
