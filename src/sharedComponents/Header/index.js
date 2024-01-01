import Logo from "../../assets/logo.svg";
import ThemeSVG from "../../assets/theme.svg";

export default function Header() {


  return (
      <div className="row mb-5">
        <div className="col-md-12 col-lg-12">
          <div className="d-flex w-100">
            <div>
              <img src={Logo} alt="logo" height={35} />
            </div>
            <div className="ml-auto">
              <img src={ThemeSVG} alt="theme" className="cursor-pointer mr-4" />
            </div>
          </div>
        </div>
      </div>
  );
}

