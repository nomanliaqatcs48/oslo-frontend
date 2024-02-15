import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "../../components/Button";

export default function AddNetworkModal({
  show = true,
  handleClose,
  handleSubmit,
}) {
  const [passView, setPassView] = useState(false);
  const [cpassView, setCPassView] = useState(false);
  const [pharseValues, setPharseValues] = useState([]);

  useEffect(() => {
    if (pharseValues.length === 0) {
      let pharses = [];
      for (let i = 1; i <= 12; i++) {
        const item = "";
        pharses.push(item);
      }
      setPharseValues(pharses);
    }
  }, []);

  const onPaste = (event) => {
    const pasted = event.clipboardData.getData("text/plain");
    setPharseValues(pasted.split(" ").slice(0, pharseValues.length));
  };

  const handleChange = (e, i) => {
    console.log("", e.target.value);
    let value = e.target.value;
    if (value.split(" ").length > 1) {
      return;
    }
    pharseValues[i] = value;

    setPharseValues([...pharseValues]);
  };

  const InputField = (pharseVal, i) => {
    return (
      <div className="col-4 mt-3 oslo-form" key={i}>
        <Form.Control
          className="secure-input"
          type="text"
          value={pharseVal}
          onChange={(e) => handleChange(e, i)}
          onPaste={(e) => onPaste(e)}
        />
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-width">
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            password: "",
            cpassword: "",
            secret_key: "",
            merchant_account: "N",
          }}
          validationSchema={Yup.object({
            password: Yup.string().min(8).required("This field is required."),
            cpassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("This field is required."),
          })}
          onSubmit={(values) => {
            const {password, secret_key, merchant_account} = values;
            handleSubmit({ password: values.password, secret_key, merchant_account, pharseValues});
          }}
        >
          {(props) => {
            const { setFieldValue, values, touched, errors, handleChange, handleSubmit } =
              props;
            return (
              <form onSubmit={handleSubmit} className="w-100">
                <div className="row mb-4">
                  <Form.Label className="content">Secret Phrase</Form.Label>
                  <p style={{ color: "gray", marginBottom: 0 }}>
                    You can paste your entire secret recovery phrase into any
                    field
                  </p>
                  {pharseValues.length > 0 &&
                    pharseValues.map((pharseVal, i) =>
                      InputField(pharseVal, i)
                    )}
                </div>
                <hr />
                <p className="text-center fs-4 fw-bold text-secondary">OR</p>
                {/* <hr /> */}
                <Form.Label className="content">Secret Key</Form.Label>
                <InputGroup className="mb-4">
                  <Form.Control
                    type={"text"}
                    name="secret_key"
                    placeholder="Secret Phrase"
                    size={"lg"}
                    onChange={handleChange}
                    value={values.secret_key}
                    isInvalid={touched.secret_key && errors.secret_key}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.secret_key}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label className="content">
                  New Password (8 characters min)
                </Form.Label>
                <InputGroup className="mb-4">
                  <Form.Control
                    type={passView ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    size={"lg"}
                    onChange={handleChange}
                    value={values.password}
                    isInvalid={touched.password && errors.password}
                  />
                  <InputGroup.Text
                    onClick={() => setPassView(!passView)}
                    className="cursor-pointer"
                  >
                    <i
                      className={passView ? "bi bi-eye" : "bi bi-eye-slash"}
                    ></i>
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>

                <Form.Label className="content">Confirm Password</Form.Label>
                <InputGroup className="mb-4">
                  <Form.Control
                    type={cpassView ? "text" : "password"}
                    name="cpassword"
                    placeholder="Confirm Password"
                    size={"lg"}
                    onChange={handleChange}
                    value={values.cpassword}
                    isInvalid={touched.cpassword && errors.cpassword}
                  />
                  <InputGroup.Text
                    onClick={() => setCPassView(!cpassView)}
                    className="cursor-pointer"
                  >
                    <i
                      className={cpassView ? "bi bi-eye" : "bi bi-eye-slash"}
                    ></i>
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.cpassword}
                  </Form.Control.Feedback>
                </InputGroup>
                <div className="d-flex">
                  <Form.Check
                    type={"checkbox"}
                    id={"pass-term-checkbox"}
                    checked={values.merchant_account === "Y"}
                    name="merchant_account"
                    onChange={e => setFieldValue('merchant_account', e.target.checked ? 'Y' : 'N')}
                    label={
                      <p className="description">Is it a merchant account?</p>
                    }
                  />
                </div>
                <Button label={"Submit"} className="mt-4 mb-5" type="submit" />
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
