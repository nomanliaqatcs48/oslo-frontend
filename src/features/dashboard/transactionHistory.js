import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Text from "../../components/Text";
import Button from "../../components/Button";
import OsloBtn from "./osloBtn";

export default function SendTransaction() {
  const [activeBtn, setActiveBtn] = useState("send");
  const inputField = ({ name, value, placeholder, type, options }) => {
    return (
      <>
        {type === "text" && (
          <Form.Control
            type={type ?? "text"}
            name={name}
            placeholder={placeholder}
            value={value}
            required
            className="mr-3"
          />
        )}
        {type === "select" && (
          <Form.Select className="mr-3">
            <option>{placeholder}</option>
          </Form.Select>
        )}
      </>
    );
  };

  const card = ({ label, value, background }) => {
    return (
      <div className={`stats-card ${background}`}>
        <Text label={label} size={14} weight={600} lineHeight={36} />
        <Text label={value} />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="m-auto col-12 col-md-10 col-lg-8">
          <div className="text-center mb-4">
            <Text label="Transaction History" size={24} weight={700} />
          </div>
          <div className="stats-section">
            {card({
              label: "Total Transactions",
              value: "2500",
              background: "total-transition-light",
            })}
            {card({
              label: "Total Sent",
              value: "2300",
              background: "total-sent-light",
            })}
            {card({
              label: "Total Received",
              value: "500",
              background: "total-recieved-light",
            })}
            {card({
              label: "Total Successful",
              value: "2500",
              background: "total-successful-light",
            })}
            {card({
              label: "Total Failed",
              value: "300",
              background: "total-failed-light",
            })}
          </div>
          <div className="oslo-card mt-3">
            <div className="d-flex justify-content-center">
              <OsloBtn activeBtn={activeBtn} setActiveBtn={btn => setActiveBtn(btn)} />
            </div>
            <div className="d-flex p-4 justify-content-between">
              {inputField({
                name: "search",
                value: "",
                placeholder: "Search",
                type: "text",
              })}
              {inputField({
                name: "time",
                value: "",
                placeholder: "Time",
                type: "select",
                options: [],
              })}
              {inputField({
                name: "status",
                value: "",
                placeholder: "Status",
                type: "select",
                options: [],
              })}
            </div>
            <Table responsive="sm" hover>
              {/* variant="dark" */}
              <thead>
                <tr className="table-header">
                  <th className="left-border-radius">Transaction ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="right-border-radius">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-header">
                  <td align="center">0x1a8470</td>
                  <td align="center">OSLO 250</td>
                  <td align="center">15 Dec, 2023</td>
                  <td align="center">
                    <span className="success-status">Successful</span>
                  </td>
                </tr>
                <tr className="table-header">
                  <td align="center">0x1a8470</td>
                  <td align="center">OSLO 250</td>
                  <td align="center">15 Dec, 2023</td>
                  <td align="center">
                    <span className="success-status">Successful</span>
                  </td>
                </tr>
                <tr className="table-header">
                  <td align="center">0x1a8470</td>
                  <td align="center">OSLO 250</td>
                  <td align="center">15 Dec, 2023</td>
                  <td align="center">
                    <span className="failed-status">Failed</span>
                  </td>
                </tr>
                <tr className="table-header">
                  <td align="center">0x1a8470</td>
                  <td align="center">OSLO 250</td>
                  <td align="center">15 Dec, 2023</td>
                  <td align="center">
                    <span className="success-status">Successful</span>
                  </td>
                </tr>
                <tr className="table-header">
                  <td align="center">0x1a8470</td>
                  <td align="center">OSLO 250</td>
                  <td align="center">15 Dec, 2023</td>
                  <td align="center">
                    <span className="failed-status">Failed</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
