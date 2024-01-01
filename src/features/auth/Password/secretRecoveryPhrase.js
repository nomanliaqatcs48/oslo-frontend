import React from "react";
import LightBulb from "../../../assets/bulb.svg";
import PharseSection from "../pharseSection";
import Button from "../../../sharedComponents/Button";

export default function SecretRecoveryPhrase({ pageStep, setPageStep, pharseVals }) {
  return (
    <div className="mt-4">
      <div className="content fw-bold">
        Write down your Secret Recovery Phrase
      </div>
      <p className="description mt-2">
        Take a moment to carefully transcribe this 12-word Secret Recovery
        Phrase and secure it in a place that you trust, ensuring only you can
        access it.
      </p>
      <div className="d-flex justify-content-start align-items-start">
        <img src={LightBulb} alt="bulb" className="mr-2" />
        <p className="description" style={{ marginTop: 2 }}>
          Tips:
        </p>
      </div>
      <ul className="description light-gray fw-bold">
        <li>Save in a password manager</li>
        <li>Store in a safe deposit box</li>
        <li>Write down and store in multiple secret places</li>
      </ul>
      <PharseSection pageStep={pageStep} pharseVals={pharseVals} />

      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-20 col-lg-8">
          {/* <button className="btn action-btn-primary action-btn">
            <span>Confirm Secret Recovery Phrase</span>
          </button> */}
          <Button
            label="Confirm Secret Recovery Phrase"
            onClick={() => setPageStep(4)}
          />
        </div>
      </div>
    </div>
  );
}
