// import React, { useState, useRef, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// // import QrReader from "react-qr-scanner";
// // import QrReader from "react-qr-reader";
// // import QrReader from 'react-web-qr-reader';
// import QrReader  from 'react-qr-reader';
// const previewStyle = {
//   height: 250,
//   width: "100%",
// };

// export default function ScanQRCodeModal({ show, handleClose, setSendAddress }) {
//   const handleScan = (data) => {
//     if (!data) return;
//     console.log("data", data);
//     setSendAddress(data);
//     handleClose();
//   };

//   const handleError = (err) => {
//     console.log(err);
//   };

//   const [cameraId, setCameraId] = useState("environment");
//   const videoRef = useRef(null);

//   const handleCameraSwitch = () => {
//     setCameraId(cameraId === "user" ? "environment" : "user");
//   };

//   useEffect(() => {
//     var video = document.querySelector('video');
//     var isPlaying = video?.currentTime > 0 && !video?.paused && !video?.ended 
//     && video.readyState > video.HAVE_CURRENT_DATA;

// if (!isPlaying) {
//   video?.play();
// }
//   },[show])

//   return (
//     <Modal
//       show={show}
//       onHide={() => handleClose()}
//       dialogClassName="modal-width"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Scan QR Code</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="mb-5">
//         {/* <QrReader
//           delay={100}
//           // cameraId={cameraId}
//           style={previewStyle}
//           key="environment"
//   constraints={{ facingMode: 'environment' }}
  
//   // constraints={{ facingMode: cameraId === 'user' ? 'user' : { exact: 'environment' } }}


//           onError={handleError}
//           onScan={handleScan}
//           className="mt-5"
//           // ref={videoRef}
//         /> */}
//         <QrReader
//           delay={500}
//           // ViewFinder={function noRefCheck(){}}
//           constraints={{
//             video: true,
//             facingMode: cameraId 
//           }}
//           facingMode={cameraId}
//           // cameraId={cameraId}
//           // facingMode={cameraId}
//           videoId="video"
//           onError={handleError}
//           onScan={handleScan}
//           style={previewStyle}
//           // legacyMode
//           // onResult={function noRefCheck(){}}
//         />
//         <button onClick={handleCameraSwitch} className="text-center">
//           Switch Camera
//         </button>
//       </Modal.Body>
//     </Modal>
//   );
// }


import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import Modal from "react-bootstrap/Modal";

const QRScanner = ({show, handleClose}) => {
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front camera, 'environment' for back camera

  const handleScan = (data) => {
    if (data) {
      console.log('Scan result:', data);
    }
  };

  const handleError = (error) => {
    console.error('QR Scanner Error:', error);
  };

  const toggleFacingMode = () => {
    setFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      dialogClassName="modal-width"
    >
    <div>
      <button onClick={toggleFacingMode}>Toggle Camera</button>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        facingMode={facingMode}
        style={{ width: '100%' }}
      />
    </div>
    </Modal>
  );
};

export default QRScanner;