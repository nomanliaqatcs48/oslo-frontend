import React from "react";
import SecureWallet from "./secureWallet";
import SecretRecoveryPhrase from "./secretRecoveryPhrase";

export default function Step2({setPageStep}) {
  return (
    <div className="mt-4">
      {/* <SecureWallet /> */}
        <SecretRecoveryPhrase setPageStep={setPageStep} />
    </div>
  );
}
