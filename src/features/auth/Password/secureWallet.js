import React from "react";
import Button from "../../../components/Button";

export default function SecureWallet({ setPageStep, createAccount }) {
  return (
    <div className="mt-4">
      <div className="secure mb-4 content">
        Protect your assets with utmost care.
      </div>
      <div>
        <div className="content fw-bold">What is a Secret Recovery Phrase?</div>
        <p className="description light-gray mt-2">
          Your Secret Recovery Phrase is a powerful 12-word combination, acting
          as the 'master key' to unlock access to your Oslo Crypto wallet and
          protect your funds.
        </p>
        <div className="content fw-bold mt-3">
          How do I save my Secret Recovery Phrase?
        </div>
        <ul className="description light-gray mt-2">
          <li>Save in a password manager.</li>
          <li>Store in a safe deposit box.</li>
          <li>Write down and store in multiple secure places.</li>
        </ul>
        <div className="content fw-bold mt-3">
          Should I share my Secret Recovery Phrase?
        </div>
        <p className="description light-gray mt-2">
          Never, ever share your Secret Recovery Phrase, not even with Oslo
          Crypto! If someone requests your recovery phrase, they are likely
          attempting to scam you and steal your wallet funds.
        </p>
        <div className="row justify-content-center mt-5 mb-4">
          <div className="col-12 col-md-20 col-lg-8">
            <Button
              label="Secure My Wallet"
              onClick={() => {
                setPageStep(3);
                createAccount();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
