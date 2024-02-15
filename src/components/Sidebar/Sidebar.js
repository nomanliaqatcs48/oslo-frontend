import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../assets/logo.svg";
import "./Sidebar.css";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSignOut = () => {
   localStorage.clear()
    // dispatch(clearState());
    navigate("/login");
  };

  const onLock = () => {
    window.localStorage.setItem("loginType", "lock");
    window.localStorage.removeItem("secret");
    // dispatch(clearState());
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
          <div className="nav_link">
          <li onClick={onLock} className="nav_end_lock_link active" role="button">
            <i className="bi bi-lock mr-2"></i>
            <span className="nav_name">Lock</span>
          </li>
          <li onClick={onSignOut} className="nav_end_link active" role="button">
            <i className="bi bi-box-arrow-right mr-2"></i>
            <span className="nav_name">Sign Out</span>
          </li>
          </div>
        </nav>
      </div>
    </>
  );
};
