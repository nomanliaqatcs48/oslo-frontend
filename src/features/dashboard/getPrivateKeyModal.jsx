import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Button from "../../components/Button";

export default function GetPrivateKeyModal({ show, handleClose, getAddressAccount }) {
  const [pharseValues, setPharseValues] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [isDisabledBtn, setIsDisabledBtn] = useState(true)

  const getSecretKey = () => {
    const account  = getAddressAccount(pharseValues);
    if(account && account?.account?.privateKey) {
      setSecretKey(account?.account?.privateKey)
    } else {
      toast.error("Invalid mnemonic phrase", {
        theme: "colored",
      });
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretKey);
    toast.success("Copied!", {
      theme: "colored",
    });
  };

  useEffect(() => {
    let pharses = [];
    for (let i = 1; i <= 12; i++) {
      const item = "";
      pharses.push(item);
    }
    setPharseValues(pharses);
    setSecretKey("")
  }, [show]);

  const onPaste = (event) => {
    
    const pasted = event.clipboardData.getData("text/plain");
    setPharseValues(pasted.split(" ").slice(0, pharseValues.length));
    setIsDisabledBtn(false)
  };

  const handleChange = (e, i) => {
    console.log("", e.target.value);
    let value = e.target.value;
    if (value.split(" ").length > 1) {
      return;
    }
    pharseValues[i] = value;

    setPharseValues([...pharseValues]);
    setIsDisabledBtn(false)
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
    <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
      <Modal.Header closeButton>
        <Modal.Title>Get Secret Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-4">
          <Form.Label className="content">Secret Phrase</Form.Label>
          <p style={{ color: "gray", marginBottom: 0 }}>
            You can paste your entire secret recovery phrase into any field
          </p>
          {pharseValues.length > 0 &&
            pharseValues.map((pharseVal, i) => InputField(pharseVal, i))}
        </div>
        {secretKey && (
          <>
            <div className="d-flex w-100 justify-content-between mb-3">
              <h5>Secet Key</h5>
              <div
                className="d-flex cursor-pointer"
                style={{ color: "#CFB577" }}
                onClick={copyToClipboard}
              >
                <i className="bi bi-clipboard-check-fill mr-2"></i>
                <h6 className="typography-1">copy to clipboard</h6>
              </div>
            </div>
            <h6>{secretKey}</h6>
          </>
        )}
        <Button label={"Submit"} className="mt-4 mb-5" disabled={isDisabledBtn} type="submit" onClick={getSecretKey} />
      </Modal.Body>
    </Modal>
  );
}
