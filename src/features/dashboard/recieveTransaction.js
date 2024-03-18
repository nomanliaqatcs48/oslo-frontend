import React from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

export default function recieveTransaction({ address }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    toast.success("Copied!", {
      theme: "colored",
    });
  };
  return (
    <div className="text-center" style={{ marginBlock: "5rem 2rem" }}>
      <QRCode value={address}
      constraints={{
        facingMode: "environment",
      }}
      key="environment"
       />
      <div className="d-flex mt-5 justify-content-center">
        <p>{address}</p>
        <i className="bi bi-copy ms-2 cursor-pointer" onClick={copyToClipboard} style={{ color: "#cfb577" }}></i>
      </div>
    </div>
  );
}
