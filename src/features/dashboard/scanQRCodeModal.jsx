import React from "react";
import Modal from "react-bootstrap/Modal";
import QrReader from "react-qr-scanner";

const previewStyle = {
  height: 250,
  width: "100%",
};

export default function ScanQRCodeModal({show, handleClose, setSendAddress}) {
  const handleScan = (data) => {
    if(!data) return;
    console.log("data", data);
    setSendAddress(data.text);
    handleClose();
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
      <Modal.Header closeButton>
        <Modal.Title>Scan QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-5">
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          className="mt-5"
        />
        {/* <p>{this.state.result}</p> */}
      </Modal.Body>
    </Modal>
  );
}
