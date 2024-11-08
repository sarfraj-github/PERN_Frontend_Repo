import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authApi from "./api/authApi";

const Login = () => {
  const navigate = useNavigate();

  // const [userRecord, setUserRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

    async function formData(userData) {
      try{
        // setUserRecord(userData); // set user Data in state
        console.log('form--data---> ' , userData)
    
        const result = await authApi.login(userData);
        console.log("result--login.jsx-->", result);
        console.log('formik.values.email == ',formik.values.email)
        console.log('formik.values.email == ',formik.values.password)
    
        if (result.success) {
          console.log('result.authToken-->',result.authToken);
          sessionStorage.setItem("token", result.authToken);
          // let data = sessionStorage.getItem("token");
          navigate("/");
        } else {
          console.log(result.errors);
        }
      } catch (error) {
          console.log('error-in-catch-block--->>>' , error);
          setErrorMessage(error.response.data.errors);
      }
    }
  
  //======== Formik Yup Validation ===========
  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("* Please enter a valid email")
      .required("* Email is Required"),
    password: Yup.string()
      .min(6, "Pasword must be 6 or more characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      // console.log("formik--login--values---> ", values);
      formData(values);
      resetForm();
    },
  });
  //==========  ./ Formik Yup END ===========

  //-------- Sign-Up --------
  const signup = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <div className="mt-5 login-form-border p-3">
          <h4 className="text-center text-primary">Login Page</h4>
          
          <Form onSubmit={formik.handleSubmit} method="post" autoComplete="off" className="mx-3">
            <Form.Group>
              <Form.Label className="fw-bold">Email Id:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <div className="text-danger">
                {formik.errors.email ? formik.errors.email : ""}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-bold">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div className="text-danger">
                {formik.errors.password ? formik.errors.password : ""}
              </div>
            </Form.Group>

            <Button
              className="btn w-100 my-2"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <br />
            <div className="text-center">
              <p
                className="text-center text-primary"
                onClick={() => {
                  signup();
                }}
                style={{cursor : "pointer" , textDecoration : "underline"}}
              >
                Don't have an account!
              </p>
            </div>
            <h6 className="text-center" style={{fontSize : "14px"}}>&copy; By ♥ Mohammd Sarfraj, 2024 !</h6>
            <div className="text-danger text-center mt-1">
              {errorMessage ? errorMessage : ""}
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
