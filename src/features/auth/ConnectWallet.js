import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import LightWalletIcon from "../../assets/lightWalletIcon.png";
import Button from "../../components/Button";
import { toggleSeedPharse } from "./auth.slice";

export default function ConnectWallet({ setWalletPage }) {
  const dispatch = useDispatch();
  const [checkedTerms, setCheckedTerms] = useState(false)
  return (
    <div className="bg-image">
      <p className="login-content">
        <span className="bold-text">Welcome to OSLO!</span>
        <br /> Where financial freedom meets security. Take control of your
        assets and experience the future of decentralized finance.
      </p>
      <div className="wallet-section">
        <div className="text-center pb-5">
          <img
            src={LightWalletIcon}
            alt="wallet"
            className="mt-5 mb-4"
            height={140}
          />
          <div className="d-flex text-center w-100 justify-content-center">
            <Form.Check
              type={"checkbox"}
              checked={checkedTerms}
              onChange={() => setCheckedTerms(!checkedTerms)}
              label={
                <p className="description">
                  I agree to OSLO <a href="#">Terms of use</a>
                </p>
              }
            />
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <Button
                label="Create New Wallet"
                disabled={!checkedTerms}
                onClick={() => setWalletPage("new")}
              />
              <Button
                label="Connect Existing Wallet"
                className="mt-3"
                secondary={true}
                disabled={!checkedTerms}
                onClick={() => {dispatch(toggleSeedPharse(false)); setWalletPage("exist")}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
