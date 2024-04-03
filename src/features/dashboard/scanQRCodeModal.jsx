// import React, { useState, useRef, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// import QrReader from "react-qr-scanner";
// // import QrReader from "react-qr-reader";
// // import QrReader from 'react-web-qr-reader';
// // import QrReader  from 'react-qr-reader';
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
//     && video?.readyState > video?.HAVE_CURRENT_DATA;

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
//           key={cameraId}

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


// versi "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru

import { useState } from "react";
import QrReader from "react-qr-reader";
 import Modal from "react-bootstrap/Modal";

const App = ({show, handleClose}) => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      dialogClassName="modal-width"
    >
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={"environment"}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
    </Modal>
  );
};

export default App;
