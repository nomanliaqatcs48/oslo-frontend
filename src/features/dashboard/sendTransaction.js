import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Success from "./success";
import OsloBtn from "./osloBtn";
import { sendToken } from "../../wallet-utils/TransactionUtils";
import { generateAccount } from "../../wallet-utils/AccountUtils";
import RecieveTransaction from "./recieveTransaction";
var CryptoJS = require("crypto-js");

export default function SendTransaction({ balance, fetchData, address }) {
  const [success, setSuccess] = useState(false);
  const [activeBtn, setActiveBtn] = useState("send");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const lableInput = ({
    label,
    name,
    value,
    placeholder,
    type,
    options,
    readOnly,
    onChange,
    errors,
    touched,
  }) => {
    return (
      <div className="mt-3 oslo-form">
        <Text label={label} size={16} weight={600} className="mb-1" />
        {type === "text" && (
          <InputGroup>
            <Form.Control
              type={type ?? "text"}
              name={name}
              placeholder={placeholder}
              size={"md"}
              onChange={onChange}
              value={value}
              readOnly={readOnly}
              isInvalid={touched[name] && errors[name]}
            />
            <Form.Control.Feedback type="invalid">
              {errors[name]}
            </Form.Control.Feedback>
          </InputGroup>
        )}
        {type === "select" && (
          <Form.Select>
            {options.length > 0 ? (
              options.map((option, i) => (
                <option value={option.value} key={i}>
                  {option.label}
                </option>
              ))
            ) : (
              <option>{placeholder}</option>
            )}
          </Form.Select>
        )}
      </div>
    );
  };

  const transfer = async ({ amount, accountAddress, destinationAddress }) => {
    // setNetworkResponse({
    //   status: "pending",
    //   message: "",
    // });
    setLoading(true);
    let pharse = window.localStorage.getItem("pharse");
    let secret = window.localStorage.getItem("secret");
    secret = CryptoJS.AES.decrypt(secret, accountAddress);
    secret = secret.toString(CryptoJS.enc.Utf8);
    pharse = CryptoJS.AES.decrypt(pharse, secret);
    pharse = pharse.toString(CryptoJS.enc.Utf8);
    console.log(pharse);

    const accountInfo = generateAccount(pharse);

    try {
      setData({ amount, destinationAddress });
      const { receipt } = await sendToken(
        parseFloat(amount),
        accountAddress,
        destinationAddress,
        accountInfo.account.privateKey
      );

      if (receipt.status === 1) {
        console.log(receipt);
        setSuccess(!success);
        fetchData();
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.error("Please enter the valid destination address!", {
          theme: "colored",
        });
        console.log(`Failed to send ${receipt}`);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="m-auto col-12 col-md-9 col-lg-5">
          {success ? (
            <Success setSuccess={() => setSuccess(!success)} data={data} />
          ) : (
            <>
              <div className="text-center mb-4">
                <Text label="Send & Receive" size={24} weight={700} />
              </div>
              <div className="total-oslo mt-2">
                <Text label={`OSLO ${parseInt(balance).toFixed(2)}`} size={38} weight={600} />
              </div>
              <div className="oslo-card mt-3">
                <OsloBtn
                  activeBtn={activeBtn}
                  setActiveBtn={(btn) => setActiveBtn(btn)}
                />
                {activeBtn === "send" ? (
                  <Formik
                    initialValues={{
                      send_from: address,
                      send_to: "",
                      secret_key: "",
                      asset: "oslo",
                      amount: null,
                    }}
                    enableReinitialize
                    validationSchema={Yup.object({
                      send_from: Yup.string().required(
                        "This field is required."
                      ),
                      send_to: Yup.string().required("This field is required."),
                      amount: Yup.string()
                        .required("This field is required.")
                        .matches(/(\d+(?:\.\d+)?)/),
                    })}
                    onSubmit={(values) => {
                      // const {fullName, email, password} = values;
                      // const data = {
                      //   userName: fullName,
                      //   email,
                      //   password
                      // }
                      // register(data);
                      const { amount, send_from, send_to } = values;
                      transfer({
                        amount: amount,
                        accountAddress: send_from,
                        destinationAddress: send_to,
                      });
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
                          <div className="mt-4 mb-2 position-relative">
                            {lableInput({
                              label: "Send from",
                              name: "send_from",
                              value: values.send_from,
                              placeholder: "Select Wallet",
                              type: "text",
                              readOnly: true,
                              onChange: handleChange,
                              errors,
                              touched,
                            })}
                            {lableInput({
                              label: "Send To",
                              name: "send_to",
                              value: values.send_to,
                              placeholder:
                                "Enter public address (0x) or ENS name",
                              type: "text",
                              onChange: handleChange,
                              errors,
                              touched,
                            })}
                             {lableInput({
                              label: "Secret Key",
                              name: "secret_key",
                              value: values.secret_key,
                              placeholder:
                                "Enter the secret key",
                              type: "text",
                              onChange: handleChange,
                              errors,
                              touched,
                            })}
                            {lableInput({
                              label: "Asset",
                              name: "asset",
                              value: "",
                              placeholder: "Select Asset",
                              type: "select",
                              options: [{ value: values.asset, label: "Oslo" }],
                              errors,
                            })}
                            {lableInput({
                              label: "Amount",
                              name: "amount",
                              value: values.amount,
                              placeholder: "0.00",
                              type: "text",
                              onChange: handleChange,
                              errors,
                              touched,
                            })}
                          </div>
                          <Button
                            label="Send"
                            type="submit"
                            className="mt-4"
                            disabled={loading}
                          />
                          {loading && (
                            <div className="spinner-loading">
                              <Spinner
                                animation="border"
                                style={{ height: "7rem", width: "7rem" }}
                                variant="dark"
                              />
                            </div>
                          )}
                        </form>
                      );
                    }}
                  </Formik>
                ) : (
                  <RecieveTransaction
                    address={localStorage.getItem("address")}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
