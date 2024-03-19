import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import * as Yup from "yup";
import Table from "react-bootstrap/Table";
import Button from "../../components/Button";

export default function AddressBookModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      dialogClassName="address-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>Address Book</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-5">
        <Formik
          initialValues={{
            name: "",
            address: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("This field is required."),
            address: Yup.string().required("This field is required."),
          })}
          onSubmit={(values) => {}}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleSubmit } =
              props;
            return (
              <form onSubmit={handleSubmit} className="w-100">
                <Form.Label className="content">Name</Form.Label>
                <InputGroup className="mb-4">
                  <Form.Control
                    type={"text"}
                    name="name"
                    placeholder="Name"
                    size={"lg"}
                    onChange={handleChange}
                    value={values.name}
                    isInvalid={touched.name && errors.name}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>

                <Form.Label className="content">Address</Form.Label>
                <InputGroup className="mb-4">
                  <Form.Control
                    type={"text"}
                    name="address"
                    placeholder="Address"
                    size={"lg"}
                    onChange={handleChange}
                    value={values.address}
                    isInvalid={touched.address && errors.address}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </InputGroup>

                <Button label={"Submit"} className="mt-4 mb-5" type="submit" />
              </form>
            );
          }}
        </Formik>

        <Table responsive hover>
          <thead>
            <tr className="table-header">
              <th>
                <div style={{ width: 20 }}>#</div>
              </th>
              <th>
                <div style={{ width: 80 }}>Name</div>
              </th>
              <th>
                <div style={{ width: 100 }}>Address</div>
              </th>
              <th>
                <div style={{ width: 80 }}>Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td align="center">Isbah Salabat</td>
              <td align="center">0xA81082ea6fD0A99d56425daC010A5fC48b6044Cd</td>
              <td align="center">
                <i className="bi bi-pencil-square mr-2"></i>
                <i className="bi bi-trash"></i>
              </td>
            </tr>
            <tr>
              <td align="center">2</td>
              <td align="center">Raffay Ansari</td>
              <td align="center">0xA81082ea6fD0A99d56425daC010A5fC48b6044Cd</td>
              <td align="center">
                <i className="bi bi-pencil-square mr-2"></i>
                <i className="bi bi-trash"></i>
              </td>
            </tr>
            <tr>
              <td align="center">3</td>
              <td align="center">Noman Liaqat</td>
              <td align="center">0xA81082ea6fD0A99d56425daC010A5fC48b6044Cd</td>
              <td align="center">
                <i className="bi bi-pencil-square mr-2"></i>
                <i className="bi bi-trash"></i>
              </td>
            </tr>
            {/* ))
                  ) : (
                    <h3
                      className="text-center not-found-msg"
                      style={{  }}
                    >
                      Data not found!
                    </h3>
                  )
                ) : (
                  <div className="spinner-loading-list">
                    <Spinner
                      animation="border"
                      style={{ height: "5rem", width: "5rem" }}
                      variant="dark"
                    />
                  </div> */}
            {/* )} */}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
