import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "../../sharedComponents/Button";
import randomstring from "randomstring";

export default function PharseSecton({ walletPage, pageStep, setPageStep, pharseVals }) {
  const [hidePhase, setHidePharse] = useState(true);
  const [pharseValues, setPharseValues] = useState([]);

  useEffect(() => {
   
      setPharseValues(pharseVals);
  }, [pharseVals]);

  const InputField = (pharse) => {
    return (
      <div className="col-4 mt-3" key={pharse.id}>
        <Form.Control
          className="secure-input"
          type="text"
          name={pharse.id}
          value={pharse.value}
        />
      </div>
    );
  };
  return (
    <>
      <p className="content mt-2">Confirm Secret Recovery Phrase</p>
      <div className="seed-section">
        <div className="d-flex justify-content-between w-100">
          <div
            className="d-flex cursor-pointer"
            onClick={() => setHidePharse(!hidePhase)}
          >
            <i
              className={`bi ${hidePhase ? "bi-eye-slash" : "bi-eye"} mr-2`}
              style={{ color: "#3B91F6" }}
            ></i>
            <p className="typography-1 light-blue">
              {hidePhase ? "Show" : "Hide"} seed phrase
            </p>
          </div>
          <div className="d-flex cursor-pointer">
            <i
              className="bi bi-clipboard-check-fill mr-2"
              style={{ color: "#3B91F6" }}
            ></i>
            <p className="typography-1 light-blue">copy to clipboard</p>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {hidePhase && (
            <div className="overlay">
              <span className="d-flex justify-content-center align-items-center h-100">
                Make sure no one is watching.
              </span>
            </div>
          )}
          <div className={`${hidePhase && "alerting"} row`}>
            {pharseValues.length > 0 && pharseValues.map((pharse, i) => (
                InputField(pharse)
            ))}
            {/* {InputField("value2", "muscle")}
            {InputField("value3", "jeans")}
            {InputField("value4", "match")}
            {InputField("value5", "olympic")}
            {InputField("value6", "owl")}
            {InputField("value7", "run")}
            {InputField("value8", "zone")}
            {InputField("value9", "issue")}
            {InputField("value10", "risk")}
            {InputField("value11", "dev")}
            {InputField("value12", "cricket")} */}
          </div>
        </div>
      </div>
      {(walletPage === "exist" || pageStep === 4) && (
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-10 col-lg-8">
            <Button label="Submit" onClick={() => setPageStep(5)} />
          </div>
        </div>
      )}
    </>
  );
}
