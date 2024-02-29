import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
// import Select from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo.svg";
import LightThemeSVG from "../../assets/lightTheme.svg";
import DarkThemeSVG from "../../assets/darkTheme.svg";
import { setTheme } from "./theme.slice";
import Button from "../Button";

export default function Header({ page, openModal, selectedAddress, setSelectedAddress, addresses}) {
  const dispatch = useDispatch();
  
  const [addressList, setAddressList] = useState([]);
  const { theme } = useSelector((state) => state.theme);

  // useEffect(() => {
  //   if(addresses.length > 0) {
  //   const list = addresses.map((_address, i) => {
  //     return {
  //       value: `address${i + 1}`,
  //       label: _address,
  //       title: `Account ${i+1}`
  //     };
  //   });

  //   setAddressList(list);
  // }
  // }, [addresses]);

  // useEffect(() => {
  //   if(addressList.length > 0) {
  //   const findAddressIndex = addressList.findIndex(_add => _add.value === selectedAddress);
  //   if(findAddressIndex > -1){
  //   setSelectedAddress(addressList[findAddressIndex])
  //   }
  // }
  // }, [selectedAddress]);

  const itemTemplate = (option) => {
    const {label, title} = option;
    return (
      <div>
        <div>{title}</div>
        <div>{label}</div>
      </div>
    );
  };

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
                  style={{ width: 510, marginRight: 15 }}
                  value={selectedAddress}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    const value = e.target.value;
                    setSelectedAddress(value);
                    localStorage.setItem("selectAddress", value);
                  }}
                >
                  {addresses.length > 0 && addresses.map(
                    (address, i) => (
                      <option value={`address${i + 1}`}>
                        <>
                          <b style={{fontWeight: "bold"}}>Account {i+1}: </b>
                          <p>{address}</p>
                        </></option>
                    )
                  )}
                </Form.Select>
                {/* <Select
      value={selectedAddress}
      name="selectedAddress"
      options={addressList}
      isSearchable={false}
      formatOptionLabel={(option) => itemTemplate(option)}
      onChange={(selectedOption) => {
        
        setSelectedAddress(selectedOption);
      }}
    /> */}
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
