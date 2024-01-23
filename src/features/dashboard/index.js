import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import Send from "./sendTransaction";
import TransactionHistory from "./transactionHistory";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const addreess = localStorage.getItem("address");
    !addreess && navigate("/login")
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
            {activeTab === "dashboard" && <Send />}
            {activeTab === "history" && <TransactionHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}
