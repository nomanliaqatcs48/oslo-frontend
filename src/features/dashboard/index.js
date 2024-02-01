import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { Sidebar } from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import Send from "./sendTransaction";
import TransactionHistory from "./transactionHistory";
import { ethers } from "ethers";
import { CHAINS_CONFIG, mainnet } from "../../wallet-utils/Chain";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [balance, setBalance] = useState("0.00");

  const fetchData = async () => {
    const chain = CHAINS_CONFIG[mainnet.chainId];
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    const adddress = window.localStorage.getItem("address");
    let accountBalance = await provider.getBalance(adddress);
    
    // const balance = await web3.eth.getBalance(connectedAccount[0]);
    setBalance(
      String(formatEthFunc(ethers.utils.formatEther(accountBalance)))
    );
  };

  function formatEthFunc(value, decimalPlaces = 4) {
    return +parseFloat(value).toFixed(decimalPlaces);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const addreess = localStorage.getItem("address");
    const loginType = localStorage.getItem("loginType");
    !addreess || loginType === 'lock' && navigate("/login")
    setActiveTab(window.location.pathname.split("/")[1]);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        
        <div className="col-4 col-md-2 col-lg-2 sidebar">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </div>
        <div
          className="col-8 col-md-10 col-lg-10"
        >
          <div className="mt-4">
            <Header page="dashboard" />
            {activeTab === "dashboard" && <Send balance={balance} fetchData={fetchData} />}
            {activeTab === "history" && <TransactionHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}
