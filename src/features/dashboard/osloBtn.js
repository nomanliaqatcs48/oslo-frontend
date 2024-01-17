import React from "react";

export default function OsloBtn({activeBtn, setActiveBtn}) {
  return (
    <div className="send-recieved-btn-section">
      <div className={`oslo-btn ${activeBtn === 'send' ? "active-oslo-btn" : "inactive-oslo-btn"}`} onClick={() => setActiveBtn("send")}>
        Send
        <i className="bi bi-arrow-up-right-square-fill"></i>
      </div>
      <div className={`oslo-btn ${activeBtn === 'receive' ? "active-oslo-btn" : "inactive-oslo-btn"}`} onClick={() => setActiveBtn("receive")}>
        Receive
        <i className="bi bi-arrow-down-left-square-fill"></i>
      </div>
    </div>
  );
}
