import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Text from "../../components/Text";
import OsloBtn from "./osloBtn";

import { sendToken } from "../../wallet-utils/TransactionUtils";

export default function SendTransaction({ address }) {
  const [activeBtn, setActiveBtn] = useState("send");
  const [transactionsList, setTransactionsList] = useState([]);
  const [originalTransactionsList, setOriginalTransactionsList] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [status, setStatus] = useState("ok");

  const getTransactions = async () => {
    await axios
      .get(
        `https://explorer.oslocrypto.com/api/v2/addresses/${address}/transactions?filter=to|from`
      )
      .then(({ data }) => {
        console.log("data", data);
        let items = data.items;
        items.sort(function(a,b){
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setTransactionsList(items);
        setOriginalTransactionsList(items);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const onSearch = e => {
    const value = e.target.value;
    setSearchVal(value)
    const filterTransactions = originalTransactionsList.filter(transaction => transaction.hash.includes(value));
    setTransactionsList(filterTransactions);
  }
  
  const onHandleStatus = e => {
    const value = e.target.value;
    setStatus(value);
    const filterTransactions = originalTransactionsList.filter(transaction => transaction.status === value);
    setTransactionsList(filterTransactions);
  }

  const inputField = ({ name, value, placeholder, type, onChange, options }) => {
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
            onChange={onChange}
          />
        )}
        {type === "select" && (
          <Form.Select className="mr-3" value={value} onChange={onChange}>
            {options.map(option => (
            <option value={option.id}>{option.label}</option>
            ))}
          </Form.Select>
        )}
      </>
    );
  };

  const card = ({ label, value, background }) => {
    return (
      <div className={`stats-card ${background}`}>
        <Text label={label} size={14} weight={600} />
        <Text label={value} />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="m-auto col-12 col-md-12 col-lg-10">
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
            {/* {card({
              label: "Total Successful",
              value: "2500",
              background: "total-successful-light",
            })}
            {card({
              label: "Total Failed",
              value: "300",
              background: "total-failed-light",
            })} */}
          </div>
          <div className="oslo-card mt-3">
            {/* <div className="d-flex justify-content-center">
              <OsloBtn
                activeBtn={activeBtn}
                setActiveBtn={(btn) => setActiveBtn(btn)}
              />
            </div> */}
            <div className="d-flex p-4 justify-content-between oslo-form">
              {inputField({
                name: "search",
                value: searchVal,
                placeholder: "Search By Transaction ID",
                type: "text",
                onChange: (e) => onSearch(e)
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
                value: status,
                placeholder: "Status",
                type: "select",
                onChange: (e) => onHandleStatus(e),
                options: [{id: "ok", label: "Successful"}, {id: "failed", label: "Failed"}],
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
                {transactionsList.length > 0 ? (
                  transactionsList.map((transaction, i) => (
                    <tr className="table-header" key={i}>
                      <td align="center">{transaction.hash}</td>
                      <td align="center">
                        OSLO{" "}
                        {(
                          parseInt(transaction.value) / 1000000000000000000
                        ).toFixed(2)}
                      </td>
                      <td align="center">
                        {moment(transaction.timestamp).format("DD MMM, YYYY")}
                      </td>
                      <td align="center">
                        <span className="success-status">Successful</span>
                      </td>
                    </tr>
                  ))) : <h3 className="text-center" style={{position: "absolute", left: "53%", top: "70%"}}>Data not found!</h3>}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
