import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import QrReader from "react-qr-scanner";
// import QrReader from "react-qr-reader";s

const previewStyle = {
  height: 250,
  width: "100%",
};

export default function ScanQRCodeModal({ show, handleClose, setSendAddress }) {
  const handleScan = (data) => {
    if (!data) return;
    console.log("data", data);
    setSendAddress(data);
    handleClose();
  };

  const handleError = (err) => {
    console.error(err);
  };

  const [cameraId, setCameraId] = useState("environment");
  const videoRef = useRef(null);

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
      <Modal.Body className="mb-5">
        {/* <QrReader
          delay={100}
          // cameraId={cameraId}
          style={previewStyle}
          key="environment"
  constraints={{ facingMode: 'environment' }}
  
  // constraints={{ facingMode: cameraId === 'user' ? 'user' : { exact: 'environment' } }}


          onError={handleError}
          onScan={handleScan}
          className="mt-5"
          // ref={videoRef}
        /> */}
        <QrReader
          delay={500}
          // ViewFinder={function noRefCheck(){}}
          // constraints={{

          //   facingMode: "users",
          // }}
          cameraId={cameraId}
          // facingMode={"user"}
          // videoId="video"
          videoConstraints={{
            facingMode: cameraId === 'user' ? 'user' : { exact: 'environment' }
          }}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          // onResult={function noRefCheck(){}}
        />
        <button onClick={handleCameraSwitch} className="text-center">
          Switch Camera
        </button>
      </Modal.Body>
    </Modal>
  );
}
