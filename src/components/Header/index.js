import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
// import Select from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo.svg";
import {AddNewAddressBtn} from "../NewAddressBtn";
import {ThemeIcon} from "../ThemeIcon";

export default function Header({
  page,
  openModal,
  selectedAddress,
  setSelectedAddress,
  addresses,
}) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="row mb-5">
      <div className="col-md-12 col-lg-12">
        <div className="d-flex w-100">
          {page === "login" && (
            <div>
              <img src={Logo} alt="logo" height={35} />
            </div>
          )}
          <div>
          
          </div>
          <div className="ml-auto d-flex oslo-form">
            {page === "dashboard" && (
              <>
                <Form.Select
                  className="address-select"
                  value={selectedAddress}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    const value = e.target.value;
                    setSelectedAddress(value);
                    localStorage.setItem("selectAddress", value);
                  }}
                >
                  {addresses.length > 0 &&
                    addresses.map((address, i) => (
                      <option value={`address${i + 1}`}>
                        <>
                          <b style={{ fontWeight: "bold" }}>
                            Account {i + 1}:{" "}
                          </b>
                          <p>{address}</p>
                        </>
                      </option>
                    ))}
                </Form.Select>
                <AddNewAddressBtn openModal={() => openModal()} className="d-none d-lg-block" />
              </>
            )}
            <ThemeIcon dispatch={dispatch} theme={theme} page={page} className="d-none d-lg-block" />
          </div>
        </div>
      </div>
    </div>
  );
}
