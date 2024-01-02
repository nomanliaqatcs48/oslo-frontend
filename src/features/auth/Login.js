import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import ConnectWallet from "./ConnectWallet";
import HelpUs from "./HelpUs";
import Password from "./Password";
import PharseSecton from "./pharseSection";
import { generate } from "random-words";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [walletPage, setWalletPage] = useState(null);
  const [pharseValues, setPharseValues] = useState([]);
  const [showCreatePasswordPage, setShowCreatePasswordPage] = useState(false);

  const {} = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (pharseValues.length === 0) {
      let pharses = [];
      for (let i = 1; i <= 12; i++) {
        const item = {
          id: `value-${i}`,
          value: generate({ minLength: 3, maxLength: 5 })
        };
        pharses.push(i%2===0 ? item : {});
      }
      setPharseValues(pharses);
    }
  }, []);

  return (
    <div className="container-fluid p-4">
      <Header page="login" />
      <div className="centered-content row">
        <div className="m-auto col-12 col-md-10 col-lg-6">
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
                      <PharseSecton walletPage={walletPage} pharseVals={pharseValues} />
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
