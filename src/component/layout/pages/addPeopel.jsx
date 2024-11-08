import React from "react";
import { Col, Form, Row, Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
// import jwt_decode from "jwt-decode";
import people_api from "../../api/peopleApi";

const AddPeopel = (props) => {
    console.log(`props--> ${JSON.stringify(props.parent)}`);
    
    // const [onHide , setOnHide ] = useState(false);

//======== InitialValues ===========
const initialData = () => {
    return {
        pid : props.parent.pid ? props.parent.pid : "",
        fullname: props.parent.full_name ? props.parent.full_name : "",
        age: props.parent.age ? props.parent.age : "",
        gender: props.parent.gender ? props.parent.gender : "",
        address: props.parent.address ? props.parent.address : "",
    }
}

  //======== Formik Yup Validation ===========
  const validateSchema = Yup.object().shape({
    fullname: Yup.string().required("* Full Name Required"),
    age: Yup.number().required("Age is Required"),
    gender: Yup.string().required("Gender is required"),
    // address: Yup.string().required("Address is required")
  });

  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("formik--addPeopel--values---> ", values);
      props?.isUpdate ? updatePeopleData(values) : formData(values); // conditional function calling.
      resetForm();
    },
  });
  //==========  ./ Formik Yup END ===========

  /*------------ Add new User ------------*/
  async function formData(peopelData) {
    console.log("add--New--data--> ", peopelData);

    const result = await people_api.addNewPeopel(peopelData);
    console.log("result--addPeopel.jsx-->", JSON.stringify(result));

    if (result.success) {
      recordSaveSuccesfully();
    } 
    // else {
    //   setErrorMessage(result.errors);
    //   // console.log(result.errors);
    // }
  }
/*-------------- Edit Existing peopel Record By Id --------------*/
  async function updatePeopleData(updateedData) {
    try {
        console.log("update--data--> ", updateedData);
        
        const result = await people_api.updateExistingPeopel(updateedData);
        console.log("update--addPeopel.jsx-->", JSON.stringify(result));
        
        if (result.success) {
            recordSaveSuccesfully();
        } 
    } catch (error) {
        console.log(`error--update-data--> ${error}`);
    }
    // else {
    //   setErrorMessage(result.errors);
    //   // console.log(result.errors);
    // }
  }


  const recordSaveSuccesfully = () => {
    props.recordSaveSuccesfully();
  };

  return (
    <>
      <Modal className="modal-custom" show={props?.show} onHide={props?.show} centered >
        <Modal.Header className="background">
          <Modal.Title className="text-white">{props?.parent?.pid ? "Update Record" :  "Add New People"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <input type="hidden" name="pid" value={formik.values.pid ?formik.values.pid : null } />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Enater Full Name"
                    onChange={formik.handleChange}
                    value={formik.values.fullname}
                  />
                  <div className="text-danger">
                    {formik.errors.fullname ? formik.errors.fullname : ""}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    placeholder="Enater age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger">
                    {formik.errors.age ? formik.errors.age : ""}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="my-2">
                <Form.Group>
                  <Form.Label>Gender</Form.Label>&nbsp;&nbsp;
                  <Form.Check
                    inline
                    type="radio"
                    name="gender"
                    label="male"
                    onChange={formik.handleChange}
                    value="male"
                    checked={formik.values.gender === "male"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="gender"
                    label="female"
                    onChange={formik.handleChange}
                    value="female"
                    checked={formik.values.gender === "female"}
                  />
                  <div className="text-danger">
                    {formik.errors.gender ? formik.errors.gender : ""}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    placeholder="Address..."
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
                {/* <div className="text-danger">
                  {formik.errors.address ? formik.errors.address : ""}
                </div> */}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props?.onHide}>
            Close
          </Button>
          <Button className="background text-white" onClick={()=> formik.handleSubmit()}>
            {/* yaha per formik.handleSubmit onClick per call hoga. */}
            {props?.parent?.pid ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddPeopel;
