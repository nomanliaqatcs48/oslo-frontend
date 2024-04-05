import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResposiveSidebar } from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import Send from "./sendTransaction";
import TransactionHistory from "./transactionHistory";
import { ethers } from "ethers";
import { CHAINS_CONFIG, mainnet } from "../../wallet-utils/Chain";
import AddNetworkModal from "./addNetworkModal";
import GetPrivateKeyModal from "./getPrivateKeyModal";
import {
  generateAccount,
  generateAccountWithSecretKey,
} from "../../wallet-utils/AccountUtils";
var CryptoJS = require("crypto-js");

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [balance, setBalance] = useState("0.00");
  const [showModal, setShowModal] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [merchantAccount, setMerchantAccount] = useState(false);

  const fetchData = async () => {
    const chain = CHAINS_CONFIG[mainnet.chainId];
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    let selectAddress = window.localStorage.getItem("selectAddress");
    setSelectedAddress(selectAddress);
    let address = window.localStorage.getItem(selectAddress);
    if (!address) {
      navigate("/login");
      return;
    }
    address = JSON.parse(address);
    setMerchantAccount(address?.merchant_account);
    setPublicAddress(address?.address);
    let accountBalance = await provider.getBalance(address?.address);

    // const balance = await web3.eth.getBalance(connectedAccount[0]);
    console.log("String(formatEthFunc(ethers.utils.formatEther(accountBalance))): ", balance ,String(formatEthFunc(ethers.utils.formatEther(accountBalance))))
    setBalance(String(formatEthFunc(ethers.utils.formatEther(accountBalance))));
  };

  function formatEthFunc(value, decimalPlaces = 4) {
    return +parseFloat(value).toFixed(decimalPlaces);
  }

  useEffect(() => {
    fetchData();
  }, [selectedAddress]);

  const getAddressAccount = (pharseValues) => {
    const pharseStr = pharseValues.join(" ");
    // cloth job renew soul range equal agent device decade give carbon project
    const account = generateAccount(pharseStr); // account object contains--> address, privateKey, seedPhrase, balance
    return account;
  };

  useEffect(() => {
    const addreess = localStorage.getItem("address1");
    const loginType = localStorage.getItem("loginType");
    // const data = JSON.parse(addreess);
    if (!addreess || !loginType || loginType === "lock") {
      navigate("/login");
      return;
    }
    setActiveTab(window.location.pathname.split("/")[1]);
  }, []);

  const addNewNetwork = (data) => {
    const { pharseValues, secret_key, password, merchant_account } = data;
    let account;

    if (secret_key) {
      account = generateAccountWithSecretKey(secret_key);
    } else {
      account = getAddressAccount(pharseValues);
    }
    if (account) {
      let addressesList = window.localStorage.getItem("addressesList");
      addressesList = JSON.parse(addressesList);
      const { address, privateKey } = account.account;
      if (addressesList.includes(address)) {
        toast.error("This address is already added!", {
          theme: "colored",
        });
        return;
      }
      var secretKey = CryptoJS.AES.encrypt(privateKey, password).toString();
      var secret = CryptoJS.AES.encrypt(password, address).toString();
      window.localStorage.setItem(
        `address${addressesList?.length + 1 || 2}`,
        JSON.stringify({
          address,
          secretKey,
          secret,
          merchant_account: merchant_account === "N" ? false : true,
        })
      );
      addressesList.push(address);
      window.localStorage.setItem(
        "addressesList",
        JSON.stringify(addressesList)
      );
      setShowModal(false);
      toast.success("New address successfully added!", {
        theme: "colored",
      });
    } else {
      toast.error("Please enter correct mnemonic phrase or secret key", {
        theme: "colored",
      });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2 sidebar">
          <ResposiveSidebar
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
            showSecretModal={() => setShowSecretModal(true)}
            openModal={() => setShowModal(true)}
            page="dashboard"
          />
        </div>
        <div className="col-12 col-md-12 col-lg-10">
          <div className="mt-4">
            <Header
              page="dashboard"
              openModal={() => setShowModal(true)}
              selectedAddress={selectedAddress}
              setSelectedAddress={(adddress) => setSelectedAddress(adddress)}
              addresses={JSON.parse(
                window.localStorage.getItem("addressesList")
              )}
            />
            {activeTab === "dashboard" && (
              <Send
                balance={balance}
                fetchData={fetchData}
                address={publicAddress}
                merchantAccount={merchantAccount}
              />
            )}
            {activeTab === "history" && (
              <TransactionHistory address={publicAddress} />
            )}
          </div>
        </div>
        <AddNetworkModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={(data) => addNewNetwork(data)}
        />
        <GetPrivateKeyModal
          show={showSecretModal}
          handleClose={() => setShowSecretModal(false)}
          getAddressAccount={(pharseValues) => getAddressAccount(pharseValues)}
        />
      </div>
    </div>
  );
}
