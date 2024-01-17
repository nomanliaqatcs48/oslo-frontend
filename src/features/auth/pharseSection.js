import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "../../components/Button";

export default function PharseSecton({
  walletPage,
  pageStep,
  setPageStep,
  pharseVals,
}) {
  const [hidePhase, setHidePharse] = useState(true);
  const [pharseValues, setPharseValues] = useState([]);

  useEffect(() => {
    setPharseValues(pharseVals);
    if (walletPage === "exist") {
      setHidePharse(false);
    }
  }, [pharseVals]);

  const InputField = (pharse) => {
    return (
      <div className="col-4 mt-3" key={pharse?.id}>
        <Form.Control
          className="secure-input"
          type="text"
          name={pharse?.id}
          value={pharse?.value}
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
            {pharseValues.length > 0 &&
              pharseValues.map((pharse, i) => InputField(pharse))}
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
