import React from 'react';
import QRCode from "react-qr-code";

export default function recieveTransaction({address}) {
  return (
    <div className='text-center' style={{ marginBlock: "5rem 2rem" }}>
    <QRCode value={address} />
    <p className='mt-4'>{address}</p>
    </div>
  )
}
