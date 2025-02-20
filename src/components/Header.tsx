import Logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGithub,
  FaHome,
  FaDev,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRef, useEffect } from "react";
import Login from "./Login";
import { logout } from "../requests/user";
import { Themes } from "../constants/themes";
import { IAuthResponse } from "../types/auth.types";

type IHeaderProps = {
  theme: Themes;
  setUser: React.Dispatch<React.SetStateAction<IAuthResponse>>;
  setShowMemberForm: React.Dispatch<React.SetStateAction<boolean>>;
  showMemberForm: boolean;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: () => boolean;
};

const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClick = (event: React.MouseEvent<SVGElement>) => {
    if (!props.isLoggedIn()) {
      props.setShowMemberForm(!props.showMemberForm);
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.setGameRunning(false);
      navigate("/profile");
    }
  };

  const loginWrapperStyle = {
    opacity: props.showMemberForm ? "1" : "0",
    transition: "opacity 0.2s ease-in-out",
  };

  const handleLogout = async () => {
    const callback = () => {
      localStorage.clear();
      props.setUser({ access: "", refresh: "" });
      navigate("/");
    };
    const refresh = localStorage.getItem("refresh");
    refresh && (await logout({ refresh: refresh }, callback));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      dropdownRef?.current &&
      !(dropdownRef.current as Node).contains(target)
    ) {
      if (
        !target?.classList.contains("fa-user-circle") &&
        !target?.parentElement?.classList.contains("fa-user-circle")
      ) {
        props.setShowMemberForm(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="header-wrapper">
      <div
        className="header flex-center-center"
        style={{ backgroundColor: props.theme }}
      >
        <div
          className="brand flex-center-center"
          onClick={() => {
            navigate("/");
            props.setGameRunning(false);
          }}
        >
          <h1>AIM</h1>
          <img src={Logo} alt="" />
          <h1>MASTER</h1>
        </div>
        <div className="links flex-center-center">
          {window.location.pathname !== "/" && (
            <Link to="/" onClick={() => props.setGameRunning(false)}>
              <FaHome />
            </Link>
          )}
          <Link to="/profile">
            <FaUserCircle onClick={handleClick} className="fa-user-circle" />
          </Link>
          <div style={loginWrapperStyle} ref={dropdownRef}>
            <Login
              theme={props.theme}
              setUser={props.setUser}
              setShowMemberForm={props.setShowMemberForm}
            />
          </div>
          <a
            href="https://github.com/eliteKebob/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://kaanozmen.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDev />
          </a>
          {props.isLoggedIn() && (
            <FaSignOutAlt
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
