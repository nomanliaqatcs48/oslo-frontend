import React,{useState, useRef} from "react";
import Modal from "react-bootstrap/Modal";
// import QrReader from "react-qr-scanner";
import {QrReader} from "react-qr-reader";

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

  const [cameraId, setCameraId] = useState('environment');
  const videoRef = useRef(null);

  const handleCameraSwitch = () => {
    setCameraId(cameraId === 'user' ? 'environment' : 'user');
  };

  return (
    <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
      <Modal.Header closeButton>
        <Modal.Title>Scan QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-5">
        <QrReader
          delay={100}
          // cameraId={cameraId}
          style={previewStyle}
          key={"environmentQR"}
  // constraints={{ facingMode: cameraId === 'user' ? 'user' : { exact: 'environment' } }}
  // videoConstraints={{
  //   facingMode: cameraId === 'user' ? 'user' : { exact: 'environment' }
  // }}

          onError={handleError}
          onScan={handleScan}
          className="mt-5"
          // videoConstraints={{
          //   facingMode: cameraId
          // }}
          // ref={videoRef}
        />
        <button onClick={handleCameraSwitch} className="text-center">Switch Camera</button>
     
        {/* <p>{this.state.result}</p> */}
      </Modal.Body>
    </Modal>
  );
}
