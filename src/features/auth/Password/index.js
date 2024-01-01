import React, { useState, useEffect } from "react";
import Step from "../../../sharedComponents/Step";
import Step1 from "./step1";
import SecureWallet from "./secureWallet";
import SecretRecoveryPhrase from "./secretRecoveryPhrase";
import Step2 from "./step2";
import PharseSecton from "../pharseSection";
import Success from "./success";
import randomstring from "randomstring";

export default function Password() {
  const [pageStep, setPageStep] = useState(1);
  const [pharseValues, setPharseValues] = useState([]);

  useEffect(() => {
    if (pharseValues.length === 0) {
      let pharses = [];
      for (let i = 1; i <= 12; i++) {
        const item = {
          id: `value-${i}`,
          value: randomstring.generate({
            length: 4,
            charset: "alphabetic",
          }),
        };
        pharses.push(item);
      }
      setPharseValues(pharses);
    }
  }, []);

  return (
    <div className="main">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {[1, 2, 3, 4].includes(pageStep) && <Step pageStep={pageStep} />}
          {pageStep === 1 && <Step1 setPageStep={page => setPageStep(page)} />}
          {pageStep === 2 && <SecureWallet setPageStep={page => setPageStep(page)} />}
          {pageStep === 3 && <SecretRecoveryPhrase pageStep={pageStep} setPageStep={page => setPageStep(page)} pharseVals={pharseValues} />}
          {pageStep === 4 && <PharseSecton pageStep={pageStep} setPageStep={page => setPageStep(page)} pharseVals={pharseValues} />}
          {pageStep === 5 && <Success setPageStep={page => setPageStep(page)} />}
        </div>
      </div>
    </div>
  );
}
