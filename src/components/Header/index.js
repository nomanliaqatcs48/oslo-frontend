import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo.svg";
import LightThemeSVG from "../../assets/lightTheme.svg";
import DarkThemeSVG from "../../assets/darkTheme.svg";
import { setTheme } from "./theme.slice";

export default function Header({ page }) {
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
              <Form.Select style={{ width: 220, marginRight: 15 }}>
                <option>Account 01</option>
              </Form.Select>
            )}
            <img
              src={theme === "light" ? LightThemeSVG : DarkThemeSVG}
              alt="theme"
              width={28}
              height={28}
              className="cursor-pointer mr-4"
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
