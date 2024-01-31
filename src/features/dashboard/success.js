import React from "react";
import Text from "../../components/Text";
import Button from "../../components/Button";
import LightCheck from "../../assets/light-check.png";

export default function success({setSuccess, data}) {
  return (
    <div className="oslo-card mt-3">
      <div className="text-center mt-3">
        <img src={LightCheck} alt="check" height={200} />
      </div>
      <Text
        label="Transaction Successful!"
        size={22}
        weight="700"
        className="mt-5 mb-4"
      />
      <Text
        label={`Congratulations, You've successfully sent OSLO "${data.amount}" to the "${data.destinationAddress}" account. Your transaction is complete.`}
        size={16}
        lineHeight={32}
        weight="600"
      />
      <Button label="Back to Wallet" onClick={setSuccess} className="mt-4" />
    </div>
  );
}
