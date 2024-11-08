import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "./api/authApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function formData(userData) {
    // console.log('registration--form--data---> ' , userData)

    const result = await authApi.signup(userData);
    console.log("result--signup.jsx-->", JSON.stringify(result));

    if (result.success) {
      //   sessionStorage.setItem("token", result.authToken);
      // let data = sessionStorage.getItem("token");
      // alert(`session--storage--token--> ${data}`);
      navigate("/login");
      // window.location.assign("/");
    } else {
      setErrorMessage(result.errors);
      // console.log(result.errors);
    }
  }

  //======== Formik Yup Validation ===========
  const validateSchema = Yup.object().shape({
    firstname: Yup.string().required("* first name is required"),
    lastname: Yup.string().required("* last name is required"),
    email: Yup.string()
      .email("* Please enter a valid email")
      .required("* Email is Required"),
    password: Yup.string()
      .min(6, "Pasword must be 6 or more characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      //   console.log("formik--login--values---> ", values);
      formData(values);
      resetForm();
    },
  });
  //==========  ./ Formik Yup END ===========
 
  return (
    <>
      <section className="bg-light py-md-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border-0 shadow-sm rounded-3 shadow-sm">
                <div className="card-body  p-md-0 p-xl-5">
                  <h2 className="fs-5 fw-normal text-center text-secondary mb-4">
                    Enter your details to register
                  </h2>
                  <Form
                    action="#!"
                    method="post"
                    onSubmit={formik.handleSubmit}
                    autoComplete="off"
                  >
                    <div className="row gy-1 overflow-hidden">
                      <div className="col-12">
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            placeholder="First Name"
                          />
                          <Form.Label
                            for="firstname"
                            className="form-Form.Form.Label"
                          >
                            First Name
                          </Form.Label>
                          <div className="text-danger">
                            {formik.errors.firstname
                              ? formik.errors.firstname
                              : ""}
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            placeholder="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                          />
                          <Form.Label
                            for="lastname"
                            className="form-Form.Form.Label"
                          >
                            Last Name
                          </Form.Label>
                          <div className="text-danger">
                            {formik.errors.lastname
                              ? formik.errors.lastname
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <Form.Control
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                          <Form.Label
                            for="email"
                            className="form-Form.Form.Label"
                          >
                            Email
                          </Form.Label>
                          <div className="text-danger">
                            {formik.errors.email ? formik.errors.email : ""}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <Form.Control
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          <Form.Label for="password" className="form-Form.Form.Label">Password</Form.Label>
                          <div className="text-danger">
                            {formik.errors.password ? formik.errors.password : ""}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <Button className="btn btn-primary btn-sm fs-5 btn-lg" type="submit">Sign up</Button>
                        </div>
                      </div>
                      <div className="text-danger text-center">
                        {errorMessage ? errorMessage : ""}
                      </div>
                    </div>
                    <h6 className="text-center">&copy; By ♥ Mohammd Sarfraj, 2024 !</h6>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
