import Form from "react-bootstrap/Form";
import Logo from "../../assets/logo.svg";
import ThemeSVG from "../../assets/theme.svg";

export default function Header({ page }) {
  return (
    <div className="row mb-5">
      <div className="col-md-12 col-lg-12">
        <div className="d-flex w-100">
          {page === "login" && (
            <div>
              <img src={Logo} alt="logo" height={35} />
            </div>
          )}
          <div className="ml-auto d-flex">
            <Form.Select style={{width: 220, marginRight: 15}}>
              <option>Account 01</option>
            </Form.Select>
            <img src={ThemeSVG} alt="theme" className="cursor-pointer mr-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
