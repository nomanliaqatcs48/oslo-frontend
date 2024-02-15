import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { toggleSeedPharse } from "./auth.slice";
import { generateAccount } from "../../wallet-utils/AccountUtils";
import Password from "../../components/Password";
var CryptoJS = require("crypto-js");

export default function PharseSecton({
  walletPage,
  pageStep,
  setPageStep,
  pharseVals,
  pass,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pharseValues, setPharseValues] = useState([]);

  const { pharse, seedPharse } = useSelector((state) => state.auth);

  useEffect(() => {
    setPharseValues(pharseVals);
  }, [pharseVals]);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(seedPharse);
    toast.success("Copied!", {
      theme: "colored",
    });
  };

  const handleSubmit = ({ password }) => {
    const pharseStr = pharseValues.join(" ");
    // cloth job renew soul range equal agent device decade give carbon project
    const account = generateAccount(pharseStr); // account object contains--> address, privateKey, seedPhrase, balance
    
    if (account) {
      const { address, privateKey } = account.account;
      var secretKey = CryptoJS.AES.encrypt(privateKey, password).toString();
      var secret = CryptoJS.AES.encrypt(password, address).toString();
      window.localStorage.setItem(
        "address1",
        JSON.stringify({ address, secretKey, secret })
      );
      window.localStorage.setItem("addressesList", JSON.stringify([address]));
      window.localStorage.setItem("selectAddress", "address1");
      window.localStorage.setItem("loginType", "success");
    }
    if (pageStep === 4) {
      setPageStep(5);
    } else {
      const pharseStr = pharseValues.join(" ");
      // cloth job renew soul range equal agent device decade give carbon project
      const account = generateAccount(pharseStr); // account object contains--> address, privateKey, seedPhrase, balance

      if (account) {
        navigate("/dashboard");
      } else {
        toast.error("Invalid mnemonic phrase", {
          theme: "colored",
        });
      }
    }
  };
  return (
    <>
      <p className="content mt-2">Confirm Secret Recovery Phrase</p>
      <div className="seed-section">
        <div className="d-flex justify-content-between w-100">
          <div
            className="d-flex cursor-pointer"
            onClick={() => dispatch(toggleSeedPharse(!pharse))}
          >
            <i
              className={`bi ${pharse ? "bi-eye-slash" : "bi-eye"} mr-2`}
              style={{ color: "#3B91F6" }}
            ></i>
            <p className="typography-1 light-blue">
              {pharse ? "Show" : "Hide"} seed phrase
            </p>
          </div>
          <div className="d-flex cursor-pointer" onClick={copyToClipboard}>
            <i
              className="bi bi-clipboard-check-fill mr-2"
              style={{ color: "#3B91F6" }}
            ></i>
            <p className="typography-1 light-blue">copy to clipboard</p>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {pharse && (
            <div className="overlay">
              <span className="d-flex justify-content-center align-items-center h-100">
                Make sure no one is watching.
              </span>
            </div>
          )}
          <div className={`${pharse && "alerting"} row`}>
            {pharseValues.length > 0 &&
              pharseValues.map((pharseVal, i) => InputField(pharseVal, i))}
          </div>
        </div>
      </div>
      {walletPage === "exist" && (
        <div className="pt-4 oslo-form">
          <Password
            onSubmit={({ password }) => {
              handleSubmit({ password });
            }}
            btnLabel={"Submit"}
            section={"recovery_phrase"}
          />
        </div>
      )}
      {pageStep === 4 && (
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-10 col-lg-8">
            <Button
              label="Submit"
              onClick={() => handleSubmit({ password: pass })}
            />
          </div>
        </div>
      )}
    </>
  );
}
