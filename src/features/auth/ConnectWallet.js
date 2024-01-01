import Form from "react-bootstrap/Form";
import LightWalletIcon from "../../assets/lightWalletIcon.png";
import Button from "../../sharedComponents/Button";

export default function ConnectWallet({setWalletPage}) {
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
              id={"term-checkbox"}
              label={
                <p className="description">
                  I agree to OSLO <a href="#">Terms of use</a>
                </p>
              }
            />
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
             
              <Button label="Create New Wallet" onClick={() => setWalletPage("new")} />
              <button className="btn action-btn-secondary action-btn mt-3" onClick={() => setWalletPage("exist")}>
                <span>Connect Existing Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
