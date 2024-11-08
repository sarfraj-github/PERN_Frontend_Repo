import React, { useState, useEffect } from "react";
import people_api from "../../api/peopleApi";
import {
  DatatableWrapper,
  Filter,
  PaginationOptions,
  Pagination,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Container, Col, Row, Table, Button, Modal } from "react-bootstrap";
import InfoPill from "../../InfoPill";
import AddPeopel from "../pages/addPeopel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const People = () => {
  const [peopelRecord, setPepelRecord] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [rowRecords, setRowRecords] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdateRow, setIsUPdateRow] = useState(false); // default false

  //====== get all data of peopels ========
  const fetchAllPeopleData = async () => {
    try {
      const result = await people_api.getAllData();
      console.log(`result--people.jsx--> ${JSON.stringify(result)}`);
      if (result.success) {
        setPepelRecord(result.record);
      } else {
        setPepelRecord([]);
      }
    } catch (error) {
      console.log(`error--peolpe--get-records--> ${error}`);
    }
  };

  useEffect(() => {
    fetchAllPeopleData();
  }, []);

  const labels = {
    beforeSelect: " ",
  };

  // Data Table headers
  const headers = [
    { title: "Name", prop: "full_name", isFilterable: true },
    { title: "Gender", prop: "gender", isFilterable: true },
    { title: "Age", prop: "age", isFilterable: true },
    { title: "Address", prop: "address", isFilterable: true },
    {
      title: "Actions",
      prop: "pid",
      cell: (row) => {
        return (
          <>
            <Button
              className="btn-sm mx-2 edit-button btn-outline-primary text-capitalize"
              variant=""
              onClick={() => handleEdit(row)}
            >
              <i className="fa-regular fa-pen-to-square"></i>edit
            </Button>
            <Button
              className="btn btn-sm btn-danger mx-2 text-capitalize"
              onClick={() => handleDeleteButton(row)}
            >
              <i className="fa fa-trash"></i>delete
            </Button>
          </>
        );
      },
    },
  ];

  // add new people
  const addNewPeopleData = () => {
    setModalShow(true);
    setRowRecords([]);
  };

  // Edit a specific row
  const handleEdit = async (row) => {
    console.log(`Edit--row--> ${JSON.stringify(row)}`);
    setModalShow(true);
    setRowRecords(row);
    setIsUPdateRow(true);
  };

  // handleDelete a specific row
  const handleDeleteButton = async (row) => {
    console.log(`delete--row--> ${row}`);
    setShowDeleteModal(true);
    setRowRecords(row);
  };

  //========= Calling Delete API for delete Record from DB ===========
  const deleteRecordFromDB = async () => {
    try {
      const result = await people_api.deletePeopelById(rowRecords);
      console.log(`delete--success--> ${JSON.stringify(result)}`);

      if (result.success) {
        fetchAllPeopleData(); // ====> after delete a record again get new updated records of peopels.
        setShowDeleteModal(false);
        return toast.success("Record deleted successfully");
      }
    } catch (error) {
      console.log(`delete--error--> ${error}`);
    }
  };

  const recordSaveSuccesfully = () => {
    setModalShow(false);
    fetchAllPeopleData();
    if (isUpdateRow) {
      return toast.success("Record Updated successfully");
    } else {
      return toast.success("Record deleted successfully");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={showDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are going to delete the record. Are you sure?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => deleteRecordFromDB()}>
              Yes
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Container className="mt-3 shadow-sm p-3">
        <h6
          className="table-heading fs-3"
          style={{ textShadow: "0 2px 2px #cfc4c4" }}
        >
          Peopels All Data
        </h6>
        <DatatableWrapper
          body={peopelRecord}
          headers={headers}
          paginationOptionsProps={{
            initialState: {
              rowsPerPage: 5,
              options: [5, 10, 15, 20],
            },
          }}
        >
          <Row className="mb-4">
            <Col
              xs={12}
              lg={4}
              className="d-flex flex-col justify-content-end align-items-end"
            >
              <Filter />
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={4}
              className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
            >
              <PaginationOptions className="filter-pagination" labels={labels} />
              <div style={{ marginTop: "5px" }}>
                <InfoPill left="Total Peopels" right={peopelRecord?.length} />
              </div>
            </Col>
            <Col
              xs={12}
              sm={6}
              lg={4}
              className="d-flex flex-col justify-content-end align-items-end"
            >
              <Button
                className="background text-white btn-sm fw-bold"
                variant=""
                onClick={() => addNewPeopleData(true)}
              >
                Add New
              </Button>
            </Col>
          </Row>
          <Table className="custom-table-header" striped>
            <TableHeader />
            { peopelRecord.length > 0 ? <TableBody /> : <TableBody><tr><td colSpan={5} className="text-center">No Records Found!</td></tr></TableBody>}
          </Table>
          <Pagination />
        </DatatableWrapper>
      </Container>

      {modalShow && (
        <AddPeopel
          show={modalShow}
          parent={rowRecords}
          onHide={() => setModalShow(false)}
          recordSaveSuccesfully={recordSaveSuccesfully}
          isUpdate={isUpdateRow}
        />
      )}
    </>
  );
};

export default People;
