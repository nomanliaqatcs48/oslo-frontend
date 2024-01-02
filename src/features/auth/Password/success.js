import React from "react";
import { useNavigate } from "react-router-dom";
import LightCheck from "../../../assets/light-check.png";
import Button from "../../../components/Button"

export default function Success() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="text-center">
        <img src={LightCheck} alt="check" height={250} />
      </div>
      <div className="content mt-5">
        <p className="title">Wallet Creation Successful!</p>

        <p className="mt-4">
          Congratulations, you've successfully secured your wallet. Ensure the
          safety and secrecy of your Secret Recovery Phrase – it's now in your
          hands!
        </p>
        <p>Remember:</p>
        <ul>
          <li>MetaMask can't recover your Secret Recovery Phrase.</li>
          <li>MetaMask will never ask you for your Secret Recovery Phrase.</li>
          <li>
            Never share your Secret Recovery Phrase with anyone, as it poses a
            risk to your funds.
          </li>
        </ul>
        <p className="mt-5 fw-bold">
          Your financial security is in your control!
        </p>
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-20 col-lg-8">
              <Button label="Continue" onClick={() => navigate("/dashboard")}/>
            </div>
          </div>
      </div>
    </div>
  );
}
