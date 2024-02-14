import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import Text from "../../components/Text";
import OsloBtn from "./osloBtn";

import { sendToken } from "../../wallet-utils/TransactionUtils";

export default function SendTransaction({ address }) {
  const [activeBtn, setActiveBtn] = useState("send");
  const [transactionsList, setTransactionsList] = useState([]);
  const [originalTransactionsList, setOriginalTransactionsList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [status, setStatus] = useState("ok");
  const [totalTransactions, setTotalTransactions] = useState(0.0);
  const [sentTransactions, setSentTransactions] = useState(0.0);
  const [recieveTransactions, setRecieveTransactions] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const convertRate = 1000000000000000000;

  const totalSentTransactions = (items) => {
    const sendTransactionsList = items.filter(
      (transaction) => transaction.from.hash === address
    );
    const sum = sendTransactionsList.reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator) + parseInt(currentValue.value),
      0
    );
    setSentTransactions(sum / convertRate);
  };

  const totalReceiveTransactions = (items) => {
    const recieveTransactionsList = items.filter(
      (transaction) => transaction?.to?.hash === address
    );
    const sum = recieveTransactionsList.reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator) + parseInt(currentValue.value),
      0
    );
    setRecieveTransactions(sum / convertRate);
  };

  const getTransactions = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://explorer.oslocrypto.com/api/v2/addresses/${address}/transactions?filter=to|from`
      )
      .then(({ data }) => {
        let items = data.items;
        const totalTransactionsSum = items.reduce(
          (accumulator, currentValue) =>
            parseInt(accumulator) + parseInt(currentValue.value),
          0
        );
        setTotalTransactions(totalTransactionsSum / convertRate);
        totalSentTransactions(items);
        totalReceiveTransactions(items);
        setIsLoading(false);
        items.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setTransactionsList(items);
        setOriginalTransactionsList(items);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error", err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const onSearch = (e, name) => {
    const value = e.target.value;
    let filterTransactions;
    if (name === "id") {
      setSearchVal(value);
      setDate("")
      filterTransactions = originalTransactionsList.filter((transaction) =>
        transaction.hash.includes(value)
      );
    } else if (name === "date") {
      setDate(value);
      setSearchVal("");
      filterTransactions = originalTransactionsList.filter((transaction) =>
        moment(moment(transaction.timestamp).format("YYYY-MM-DD")).isSame(value)
      );
    }
    setTransactionsList(filterTransactions);
  };

  const inputField = ({ label, name, value, placeholder, type, onChange }) => {
    return (
      <div className="d-block w-100 ">
        <label className="mb-1">{label}</label>
        <Form.Control
          type={type ?? "text"}
          name={name}
          placeholder={placeholder}
          value={value}
          required
          className="mr-3"
          onChange={onChange}
        />
        {/* {type === "select" && (
          <Form.Select className="mr-3" value={value} onChange={onChange}>
            {options.map((option) => (
              <option value={option.id}>{option.label}</option>
            ))}
          </Form.Select>
        )} */}
      </div>
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
              value: totalTransactions.toFixed(2),
              background: "total-transition-light",
            })}
            {card({
              label: "Total Sent",
              value: sentTransactions.toFixed(2),
              background: "total-sent-light",
            })}
            {card({
              label: "Total Received",
              value: recieveTransactions.toFixed(2),
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
            <div
              className="d-flex p-4 justify-content-between oslo-form"
              style={{ gap: "2rem" }}
            >
              {inputField({
                label: "Search By Transaction ID",
                name: "search",
                value: searchVal,
                placeholder: "Search By Transaction ID",
                type: "text",
                onChange: (e) => onSearch(e, "id"),
              })}
              {inputField({
                label: "Search By Date",
                name: "date",
                value: date,
                onChange: (e) => onSearch(e, "date"),
                placeholder: "Select Date",
                type: "date",
              })}
              {/* <div className="w-50 d-grid">
              <DatePicker selected={date} onChange={(date) => setDate(date)} className="w-100" />
              </div> */}

              {/* {inputField({
                name: "status",
                value: status,
                placeholder: "Status",
                type: "select",
                onChange: (e) => onHandleStatus(e),
                options: [{id: "ok", label: "Successful"}, {id: "failed", label: "Failed"}],
              })} */}
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
                {!isLoading ? (
                  transactionsList.length > 0 ? (
                    transactionsList.map((transaction, i) => (
                      <tr className="table-header" key={i}>
                        <td align="center">{transaction.hash}</td>
                        <td align="center">
                          OSLO{" "}
                          {(parseInt(transaction.value) / convertRate).toFixed(
                            2
                          )}
                        </td>
                        <td align="center">
                          {moment(transaction.timestamp).format("DD MMM, YYYY")}
                        </td>
                        <td align="center">
                          <span className="success-status">Successful</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h3
                      className="text-center"
                      style={{ position: "absolute", left: "53%", top: "70%" }}
                    >
                      Data not found!
                    </h3>
                  )
                ) : (
                  <div className="spinner-loading-list">
                    <Spinner
                      animation="border"
                      style={{ height: "5rem", width: "5rem" }}
                      variant="dark"
                    />
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
