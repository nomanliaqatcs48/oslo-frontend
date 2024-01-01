import React from "react";

export default function Step({pageStep}) {
  return (
    <div className="d-flex text-center w-100 justify-content-center">
      <div className="step-width">
        <div className="d-flex justify-content-center">
          <div className={`step ${pageStep === 1 ? 'active-step' : 'complete-step'} bold-text`}>1</div>
        </div>
        <p className="lh-1 mt-1">Create Password</p>
      </div>
      <div className="step-division-line" />
      <div className="step-width">
        <div className="d-flex justify-content-center">
          <div className={`step ${pageStep === 1 ? 'inactive-step' : 'active-step'} bold-text`}>2</div>
        </div>
        <p className="lh-1 mt-1">Confirm secret recovery phrase</p>
      </div>
    </div>
  );
}
