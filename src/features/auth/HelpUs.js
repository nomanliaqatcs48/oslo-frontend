import React from "react";
import Button from "../../components/Button";

export default function HelpUs({ setWalletPage, setShowCreatePasswordPage }) {
  return (
    <div className="main">
      <p className="title">Help us Improve OSLO!</p>
      <div className="content">
        <p>
          At Oslo Crypto, we are committed to enhancing your experience and
          ensuring the utmost transparency. We would like to gather usage data
          to better understand how our users interact with Oslo Crypto. This
          data will be instrumental in improving our services based on your
          valuable feedback.
        </p>
        <p>Oslo Crypto will:</p>

        <ul>
          <li>
            Always prioritize your privacy by allowing you to opt-out via
            Settings.
          </li>
          <li>Send only anonymized click and pageview events for analysis.</li>
          <li>
            Never collect unnecessary information like keys, addresses,
            transaction hashes, or balances.
          </li>
          <li>Never capture your full IP address.</li>
        </ul>
        <div className="secure mt-4 mb-4">
          Rest assured, we will never sell your data. Your trust is our
          priority.
        </div>
        <p>
          The data we collect is aggregated and, therefore, anonymous, aligning
          with the principles of the General Data Protection Regulation (EU)
          2016/679.
        </p>
        <p>
          <b>Note:</b> When using Infura as your default RPC provider in Oslo
          Crypto, Infura may collect your IP address and Ethereum wallet address
          during transactions. However, we ensure that this information is
          handled securely, and our systems do not associate these two pieces of
          data.
        </p>
        <p>
          Your support in this endeavour is vital, and together, we can make
          Oslo Crypto even better!
        </p>

        <p>Thank you for choosing Oslo Crypto.</p>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <Button label="I Agree" onClick={setShowCreatePasswordPage} />
            <Button
              label="No Thanks"
              className="mt-3"
              secondary={true}
              onClick={setWalletPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
