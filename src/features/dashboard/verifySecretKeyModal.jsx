import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import {
  generateAccountWithSecretKey,
} from "../../wallet-utils/AccountUtils";

export default function VerifySecretKeyModal({ show, handleToogle, handleSubmit, address }) {

  return (
    <Modal show={show} onHide={() => handleToogle(false)} dialogClassName="modal-width">
      <Modal.Header closeButton>
        <Modal.Title>Verify Secret Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            secret_key: "",
          }}
          validationSchema={Yup.object({
            secret_key: Yup.string().required("This field is required."),
          })}
          onSubmit={(values) => {
            const { secret_key } = values;
            const account = generateAccountWithSecretKey(secret_key);
            if(account?.account?.address === address){
              handleToogle(false);
              handleSubmit();
            } else {
              handleToogle(true);
              toast.error("Please enter the valid secret key", {
                theme: "colored",
              });
            }
            
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit} className="w-100">
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
                <Button label={"Submit"} className="mt-4 mb-5" type="submit" />
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
