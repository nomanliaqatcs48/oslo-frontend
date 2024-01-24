import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../../features/product/product.slice";
import Logo from "../../assets/logo.svg";
import "./Sidebar.css";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSignOut = () => {
    localStorage.removeItem("address");
    dispatch(clearState());
    navigate("/login");
  };

  return (
    <>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <img src={Logo} alt="logo" height={35} />
          <div className="mt-5 justify-content-center d-grid">
            <div
              className={`d-flex mb-2 cursor-pointer sidebar-content ${
                activeTab === "dashboard" && "active"
              }`}
              onClick={() => {
                navigate("/dashboard");
                setActiveTab("dashboard");
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
              }}
            >
              <i className="bi bi-clock-fill mr-2"></i>
              <span className="description">Transaction History</span>
            </div>
          </div>
          <li onClick={onSignOut} className="nav_link sidebar-content" role="button">
            <i className="bi bi-box-arrow-right"></i>
            <span className="nav_name">Sign Out</span>
          </li>
        </nav>
      </div>
    </>
  );
};
