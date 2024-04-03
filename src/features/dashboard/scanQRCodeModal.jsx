import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QrReader  from 'react-qr-reader';
const previewStyle = {
  // height: 250,
  width: "350px",
};

export default function ScanQRCodeModal({ show, handleClose, setSendAddress }) {
  const handleScan = (data) => {
    if (!data) return;
    console.log("data", data);
    setSendAddress(data);
    handleClose();
  };

  const handleError = (err) => {
    console.log(err);
  };

  const [cameraId, setCameraId] = useState("environment");

  const handleCameraSwitch = () => {
    setCameraId(cameraId === "user" ? "environment" : "user");
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      dialogClassName="modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>Scan QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="mb-5 d-flex w-100 justify-content-center">
        <QrReader
          delay={500}
          constraints={{
            video: true,
            facingMode: cameraId ,
            aspectRatio: { ideal: 1 }
          }}
          key={cameraId}

          facingMode={cameraId}
          videoId="video"
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />
        </div>
        <div className="d-camera justify-content-center w-100 ">
        <Button onClick={handleCameraSwitch} className="camera-btn">
          {cameraId === "environment" ? "Front Camera" : "Back Camera"}
        </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
