import React from "react";

export default function OsloBtn() {
  return (
    <div className="send-recieved-btn-section">
      <div className="oslo-btn active-oslo-btn">
        Send
        <i class="bi bi-arrow-up-right-square-fill"></i>
      </div>
      <div className="oslo-btn inactive-oslo-btn">
        Receive
        <i class="bi bi-arrow-down-left-square-fill"></i>
      </div>
    </div>
  );
}
