import React from 'react';
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo.svg";
import LightThemeSVG from "../../assets/lightTheme.svg";
import DarkThemeSVG from "../../assets/darkTheme.svg";
import { setTheme } from "./theme.slice";
import Button from "../Button";

export default function Header({ page, openModal, selectedAddress, setSelectedAddress }) {
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
          <div className="ml-auto d-flex oslo-form">
            {page === "dashboard" && (
              <>
                <Form.Select
                  style={{ width: 430, marginRight: 15 }}
                  value={selectedAddress}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    const value = e.target.value;
                    setSelectedAddress(value);
                    localStorage.setItem("selectAddress", value);
                  }}
                >
                  {JSON.parse(window.localStorage.getItem("addressesList")).map(
                    (address, i) => (
                      <option value={`address${i + 1}`}>{address}</option>
                    )
                  )}
                </Form.Select>
                <div style={{ width: 150, marginInline: "1.5rem 2rem" }}>
                  <Button
                    label={"+ New Account"}
                    onClick={() => openModal()}
                    type="button"
                  />
                </div>
              </>
            )}
            <img
              src={theme === "light" ? LightThemeSVG : DarkThemeSVG}
              alt="theme"
              width={32}
              height={32}
              className={`cursor-pointer mr-4 ${
                page === "dashboard" && "mt-1"
              }`}
              onClick={() =>
                dispatch(setTheme(theme === "light" ? "dark" : "light"))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
