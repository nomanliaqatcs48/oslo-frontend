import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import Send from "./sendTransaction";
import TransactionHistory from "./transactionHistory";
import { ethers } from "ethers";
import { CHAINS_CONFIG, mainnet } from "../../wallet-utils/Chain";
import AddNetworkModal from "./addNetworkModal";
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
  const [selectedAddress, setSelectedAddress] = useState("");
  const [publicAddress, setPublicAddress] = useState("")

  const fetchData = async () => {
    const chain = CHAINS_CONFIG[mainnet.chainId];
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    let selectAddress = window.localStorage.getItem("selectAddress");
    setSelectedAddress(selectAddress)
    let address = window.localStorage.getItem(selectAddress);
    address = JSON.parse(address);
    setPublicAddress(address.address);
    let accountBalance = await provider.getBalance(address.address);

    // const balance = await web3.eth.getBalance(connectedAccount[0]);
    setBalance(String(formatEthFunc(ethers.utils.formatEther(accountBalance))));
  };

  function formatEthFunc(value, decimalPlaces = 4) {
    return +parseFloat(value).toFixed(decimalPlaces);
  }

  useEffect(() => {
    fetchData();
  }, [selectedAddress]);



  useEffect(() => {
    const addreess = localStorage.getItem("address1");
    const loginType = localStorage.getItem("loginType");
    const data = JSON.parse(addreess)
    if (!data.address || !loginType || loginType === "lock") {
      navigate("/login");
    }
    setActiveTab(window.location.pathname.split("/")[1]);
  }, []);

  const addNewNetwork = (data) => {
    const { pharseValues, secret_key, password, merchant_account } = data;
    let account;
    const pharseStr = pharseValues.join(" ");
    if (secret_key) {
      account = generateAccountWithSecretKey(secret_key);
    } else {
      // cloth job renew soul range equal agent device decade give carbon project
      account = generateAccount(pharseStr); // account object contains--> address, privateKey, seedPhrase, balance
    }
    if (account) {
      let addressesList = window.localStorage.getItem("addressesList");
      addressesList = JSON.parse(addressesList)
      const { address, privateKey } = account.account;
      var secretKey = CryptoJS.AES.encrypt(privateKey, password).toString();
      var secret = CryptoJS.AES.encrypt(password, address).toString();
      window.localStorage.setItem(
        `address${addressesList?.length + 1 || 2}`,
        JSON.stringify({ address, secretKey, secret })
      );
      addressesList.push(address);
      window.localStorage.setItem("addressesList", JSON.stringify(addressesList));
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
        <div className="col-4 col-md-2 col-lg-2 sidebar">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </div>
        <div className="col-8 col-md-10 col-lg-10">
          <div className="mt-4">
            <Header page="dashboard" openModal={() => setShowModal(true)} selectedAddress={selectedAddress} setSelectedAddress={adddress => setSelectedAddress(adddress)} />
            {activeTab === "dashboard" && (
              <Send balance={balance} fetchData={fetchData} address={publicAddress}  />
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
      </div>
    </div>
  );
}
