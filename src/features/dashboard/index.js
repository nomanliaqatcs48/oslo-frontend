import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import Send from "./sendTransaction";
import TransactionHistory from "./transactionHistory";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    setActiveTab(window.location.pathname.split("/")[1]);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 col-md-2 col-lg-2">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab)}
          />
        </div>
        <div
          className="col-8 col-md-10 col-lg-10"
          style={{ background: "#F8FAFC" }}
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
