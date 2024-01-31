import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "../Button";

export default function Password({ onSubmit, btnLabel, section }) {
  const [passView, setPassView] = useState(false);
  const [cpassView, setCPassView] = useState(false);
  return (
    <Formik
      initialValues={{
        password: "",
        cpassword: "",
        check: true,
      }}
      validationSchema={Yup.object({
        password: Yup.string().min(8).required("This field is required."),
        cpassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("This field is required."),
      })}
      onSubmit={(values) => {
        onSubmit({password: values.password});
      }}
    >
      {(props) => {
        const { values, touched, errors, handleChange, handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit} className="w-100">
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
                <i className={passView ? "bi bi-eye" : "bi bi-eye-slash"}></i>
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
                <i className={cpassView ? "bi bi-eye" : "bi bi-eye-slash"}></i>
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {errors.cpassword}
              </Form.Control.Feedback>
            </InputGroup>
            {section !== "recovery_phrase" && (
              <div className="d-flex">
                <Form.Check
                  type={"checkbox"}
                  id={"pass-term-checkbox"}
                  checked={values.check}
                  label={
                    <p className="description">
                      I understand that OSLO cannot recover this password for
                      me. <a href="#">Learn more</a>
                    </p>
                  }
                />
              </div>
            )}
            {/* {section !== "recovery_phrase" && ( */}
            <Button
              label={btnLabel}
              className="mt-4 mb-5"
              // onClick={() => setPageStep(2)}
              type="submit"
            />
            {/* )} */}
          </form>
        );
      }}
    </Formik>
  );
}
