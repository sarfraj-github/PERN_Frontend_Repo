import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import authApi from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  //-------- get user details ----------
  const getUserDetails = async () => {
    try {
      let userRec = await authApi.userDetails();
      // console.log(`userREc ${JSON.stringify(userRec)}`);
      // if token not found then user will be redirect on login page.
      if (userRec.error) {
        navigate("/login");
      }
      
      if (userRec) {
        console.log(`user--details--> ${JSON.stringify(userRec)}`);
        setUserDetails({
          name: userRec.first_name + " " + userRec.last_name,
          email: userRec.email,
        });
        // alert(userDetails);
      }
    } catch (error) {
      console.log(`error--during--get-user-details--> ${error}`);
    }
  };
  //-------- ./ user details END --------

  //===== useEffect =====
  useEffect(() => {
    getUserDetails();
  }, []);

  //======== Rendering On User Details Page ========
  const userInfo = () => {
    navigate("/userDetails");
  };

  //======== user-logout =========
  const logout = () => {
    console.log(`logout....!!!`);
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to="/">
            Logo
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Link className="nav-link" to="/peoples">
              Peoples
            </Link>
          </Nav>
          <Navbar.Text>
            <button
              className="btn text-capitalize fw-bold fs-5"
              onClick={() => {
                userInfo();
              }}
            >
              {userDetails?.name ? userDetails?.name : ""}
            </button>
            <button
              className="background text-white btn btn-sm"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
