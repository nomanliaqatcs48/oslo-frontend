import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../sharedComponents/Header";
import ConnectWallet from "./ConnectWallet";
import HelpUs from "./HelpUs";
import Password from "./Password";
import PharseSecton from "./pharseSection";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [walletPage, setWalletPage] = useState(null);
  const [showCreatePasswordPage, setShowCreatePasswordPage] = useState(false);

  const {} = useSelector((state) => state.auth);

  return (
    <div className="container-fluid p-4">
      <Header />
      <div className="centered-content row">
        <div className="m-auto col-12 col-md-12 col-lg-7">
          {!showCreatePasswordPage && (
            <>
              {!walletPage && (
                <ConnectWallet setWalletPage={(page) => setWalletPage(page)} />
              )}
              {walletPage === "new" && (
                <HelpUs
                  setShowCreatePasswordPage={() =>
                    setShowCreatePasswordPage(!showCreatePasswordPage)
                  }
                  setWalletPage={() => setWalletPage(null)}
                />
              )}
              {walletPage === "exist" && (
                <div className="main">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                      <PharseSecton walletPage={walletPage} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {showCreatePasswordPage && <Password />}
        </div>
      </div>
    </div>
  );
}
