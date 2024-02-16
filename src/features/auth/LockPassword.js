import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Logo from "../../assets/logo.svg";
var CryptoJS = require("crypto-js");

export default function LockPassword({setLoginType}) {
  const navigate = useNavigate();
  const [passView, setPassView] = useState(false);
  const forgotPassword = () => {
    localStorage.clear()
    setLoginType();
  };
  return (
    <>
      <img
        src={Logo}
        alt="logo"
        height={85}
        className="text-center w-100 mb-3"
      />
      <h1 className="text-center">Welcome back!</h1>
      <p className="description text-center">The decentralized web awaits</p>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string().min(8).required("This field is required."),
        })}
        onSubmit={(values) => {
          const { password } = values;
          let selectAddress = window.localStorage.getItem("selectAddress");
          let address = window.localStorage.getItem(selectAddress);
          address = JSON.parse(address);
          let secretKey = CryptoJS.AES.decrypt(address.secretKey, password);
          try {
            secretKey = secretKey.toString(CryptoJS.enc.Utf8);
            if (secretKey) {
              window.localStorage.setItem("loginType", "success");
              // let secret = CryptoJS.AES.encrypt(password, address.address).toString();
              // window.localStorage.setItem("secret", secret);
              navigate("/dashboard");
            } else {
              toast.error("Please enter the correct password", {
                theme: "colored",
              });
            }
          } catch (e) {
            toast.error("Please enter the correct password", {
              theme: "colored",
            });
            console.log(e);
          }
        }}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} className="w-100 mt-5">
              <Form.Label className="content">Password</Form.Label>
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
              <Button
                label={"Unlock"}
                className="mt-4 mb-3"
                // onClick={() => setPageStep(2)}
                type="submit"
              />
              <p className="forgot_link" onClick={forgotPassword}>
                Forgot password?
              </p>
              {/* )} */}
            </form>
          );
        }}
      </Formik>
    </>
  );
}
