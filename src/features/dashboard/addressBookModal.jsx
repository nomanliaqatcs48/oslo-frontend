import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import Table from "react-bootstrap/Table";
import Button from "../../components/Button";

export default function AddressBookModal({
  show,
  handleClose,
  selectedAddress,
}) {
  const formRef = useRef();
  const [addressesList, setAddressesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAddressesList();
  }, []);

  const getAddressesList = async () => {
    setIsLoading(true);
    await axios
      .get(`/address/${selectedAddress}`)
      .then((response) => {
        setIsLoading(false);
        setAddressesList(response.data.addresses);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const createAddress = async (params) => {
    setIsLoading(true);
    await axios
      .post(`/address/create`, params)
      .then((response) => {
        if (response.data.status === "Success") {
          toast.success("Data created successfully!", {
            theme: "colored",
          });
          setIsLoading(false);
          getAddressesList();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const updateAddress = async (params) => {
    setIsLoading(true);
    await axios
      .put(`/address/update`, params)
      .then((response) => {
        if (response.data.status === "Success") {
          toast.success("Record updated successfully!", {
            theme: "colored",
          });
          setIsLoading(false);
          getAddressesList();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const deleteAddress = async (id) => {
    setIsLoading(true);
    await axios
      .delete(`/address/${id}`)
      .then((response) => {
        if (response.data.status === "Success") {
          toast.success("Record deleted successfully!", {
            theme: "colored",
          });
          setIsLoading(false);
          getAddressesList();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const setFormValues = (item) => {
    formRef.current.setFieldValue("id", item?._id);
    formRef.current.setFieldValue("address", item?.address);
    formRef.current.setFieldValue("name", item?.name);
  }

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
          innerRef={formRef} 
          initialValues={{
            id:"",
            name: "",
            address: ""
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("This field is required."),
            address: Yup.string().required("This field is required."),
          })}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            const { name, address, id } = values;
            const params = {
              address,
              name,
            };
            if(id){
              params["id"] = id;
              updateAddress(params);
            } else {
              params["user_address"] = selectedAddress;
              createAddress(params);
            }
            resetForm();
          }}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
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
              {/* <th>
                <div style={{ width: 20 }}>#</div>
              </th> */}
              <th>
                <div style={{ width: 100 }}>Name</div>
              </th>
              <th>
                <div style={{ width: 120 }}>Address</div>
              </th>
              <th>
                <div style={{ width: 80 }}>Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {addressesList?.length > 0 ? (
              addressesList.map((address, i) => (
                <tr key={i}>
                  {/* <td align="center">{i+1}</td> */}
                  <td align="center">{address.name}</td>
                  <td align="center">{address.address}</td>
                  <td align="center">
                    <i className="bi bi-pencil-square mr-2 cursor-pointer" onClick={() => setFormValues(address)} />
                    <i className="bi bi-trash cursor-pointer" onClick={() => deleteAddress(address._id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td />
                <td>
                  <h4>Record not found!</h4>
                </td>
                <td />
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
