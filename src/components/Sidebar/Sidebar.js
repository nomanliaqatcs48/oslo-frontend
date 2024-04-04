import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo.svg";
import {MenuIcon} from "../../assets/menu";
import "./Sidebar.css";
import { AddNewAddressBtn } from "../NewAddressBtn";
import { ThemeIcon } from "../ThemeIcon";
import { isMobile } from "react-device-detect";

export const ResposiveSidebar = ({
  activeTab,
  setActiveTab,
  showSecretModal,
  openModal,
  page,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggled, setToggled] = useState(false);

  const { theme } = useSelector((state) => state.theme);

  const onSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const onLock = () => {
    window.localStorage.setItem("loginType", "lock");
    window.localStorage.removeItem("secret");
    navigate("/login");
  };

  const closeToggle = () => {
    setToggled(false);
  }

  return (
    <>
      <Sidebar
        onBackdropClick={closeToggle}
        toggled={toggled}
        breakPoint="lg"
        width={"270px"}
        backgroundColor={theme === "light" ? "#FFFFFF" : "#262525"}
        // style={{border: "none"}}
      >
        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
            <img src={Logo} alt="logo" height={35} />
            <div className="mt-5 justify-content-center d-flex flex-column align-items-center">
              <div
                className={`d-flex mb-2 cursor-pointer sidebar-content ${
                  activeTab === "dashboard" && "active"
                }`}
                onClick={() => {
                  navigate("/dashboard");
                  setActiveTab("dashboard");
                  closeToggle();
                }}
              >
                <i className="bi bi-send-fill mr-2"></i>
                <span className="description">Send & Receive</span>
              </div>
              <div
                className={`d-flex mb-2 cursor-pointer sidebar-content ${
                  activeTab === "history" && "active"
                }`}
                onClick={() => {
                  navigate("/history");
                  setActiveTab("history");
                  closeToggle();
                }}
              >
                <i className="bi bi-clock-fill mr-2"></i>
                <span className="description">Transaction History</span>
              </div>
            </div>
            <div className="nav_link">
              <li
                onClick={showSecretModal}
                className="nav_end_link active"
                role="button"
              >
                <i className="bi bi-key mr-2"></i>
                <span className="nav_name">Secret Key</span>
              </li>
              <li
                onClick={onLock}
                className="nav_end_link active"
                role="button"
              >
                <i className="bi bi-lock mr-2"></i>
                <span className="nav_name">Lock</span>
              </li>
              <li
                onClick={onSignOut}
                className="nav_end_link active"
                role="button"
              >
                <i className="bi bi-box-arrow-right mr-2"></i>
                <span className="nav_name">Sign Out</span>
              </li>
            </div>
          </nav>
        </div>
      </Sidebar>
      {/* <div className="d-lg-none d-flex w-100 mt-3 mb-4 justify-content-between">
        <div onClick={() => setToggled(true)}>
          <MenuIcon color={theme === "light" ? "#000000" : "#FFFFFF"} />
        </div>
        <div className="d-flex">
          <AddNewAddressBtn openModal={() => openModal()} screen="mobile" />
          <ThemeIcon dispatch={dispatch} theme={theme} page={page} />
        </div>
      </div> */}
    </>
  );
};
