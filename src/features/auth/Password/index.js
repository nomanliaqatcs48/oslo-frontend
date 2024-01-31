import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Step from "../../../components/Step";
import Step1 from "./step1";
import SecureWallet from "./secureWallet";
import SecretRecoveryPhrase from "./secretRecoveryPhrase";
import PharseSecton from "../pharseSection";
import Success from "./success";
import { generateAccount } from "../../../wallet-utils/AccountUtils";
import { setSeedPharse } from "../auth.slice";

export default function Password() {
  const dispatch = useDispatch();
  const [pageStep, setPageStep] = useState(1);
  const [pharseValues, setPharseValues] = useState([]);
  const [password, setPassword] = useState("")

  const createAccount = () => {
    const account = generateAccount(); // account object contains--> address, privateKey, seedPhrase, balance
    dispatch(setSeedPharse(account.seedPhrase));
    window.localStorage.setItem("address", account.account.address);
    const seedPharses = account.seedPhrase.split(" ");
    setPharseValues(seedPharses);
  };

  const handleSetPassword = ({ page, pass }) => {
    setPageStep(page);
    setPassword(pass);
  };

  return (
    <div className="main">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-10">
          {[1, 2, 3, 4].includes(pageStep) && <Step pageStep={pageStep} />}
          {pageStep === 1 && (
            <Step1
              setPageStep={({ page, pass }) =>
                handleSetPassword({ page, pass })
              }
            />
          )}
          {pageStep === 2 && (
            <SecureWallet
              setPageStep={(page) => setPageStep(page)}
              createAccount={createAccount}
            />
          )}
          {pageStep === 3 && (
            <SecretRecoveryPhrase
              pageStep={pageStep}
              setPageStep={(page) => setPageStep(page)}
              pharseVals={pharseValues}
            />
          )}
          {pageStep === 4 && (
            <PharseSecton
              pageStep={pageStep}
              setPageStep={(page) => {
                setPageStep(page)
              }}
              pharseVals={pharseValues}
              pass={password}
            />
          )}
          {pageStep === 5 && (
            <Success setPageStep={(page) => setPageStep(page)} />
          )}
        </div>
      </div>
    </div>
  );
}
