import React from "react";
import Text from "../../components/Text";
import Button from "../../components/Button";
import LightCheck from "../../assets/light-check.png";

export default function success({setSuccess}) {
  return (
    <div className="oslo-card mt-3">
      <div className="text-center mt-3">
        <img src={LightCheck} alt="check" height={200} />
      </div>
      <Text
        label="Transaction Successful!"
        size={24}
        weight="700"
        className="mt-5 mb-4"
      />
      <Text
        label="Congratulations, You've successfully sent OSLO 450 to the XXX account. Your transaction is complete."
        size={18}
        lineHeight={32}
      />
      <Button label="Back to Wallet" onClick={setSuccess} className="mt-4" />
    </div>
  );
}
