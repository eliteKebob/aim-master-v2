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

const Header = ({ theme, user, setUser, setShowMemberForm, showMemberForm }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClick = (e) => {
    if (!user) {
      setShowMemberForm(!showMemberForm);
      e.preventDefault();
      e.stopPropagation();
    } else {
      navigate("/profile");
    }
  };

  const loginWrapperStyle = {
    opacity: showMemberForm ? "1" : "0",
    transition: "opacity 0.2s ease-in-out",
  };

  const handleLogout = async () => {
    await logout({ refresh: localStorage.getItem("refresh") }, setUser);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (!event.target.classList.contains("fa-user-circle") && !event.target.parentElement.classList.contains("fa-user-circle")) {
        setShowMemberForm(false);
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
        style={{ backgroundColor: theme }}
      >
        <div className="brand flex-center-center" onClick={() => navigate("/")}>
          <h1>AIM</h1>
          <img src={Logo} alt="" />
          <h1>MASTER</h1>
        </div>
        <div className="links flex-center-center">
          {window.location.pathname !== "/" && (
            <Link to="/">
              <FaHome />
            </Link>
          )}
          <Link to="/profile" >
            <FaUserCircle onClick={(e) => handleClick(e)} className="fa-user-circle" />
          </Link>
          <div style={loginWrapperStyle} ref={dropdownRef}>
            <Login
              theme={theme}
              setUser={setUser}
              setShowMemberForm={setShowMemberForm}
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
          {user && <FaSignOutAlt style={{ cursor: "pointer" }} onClick={handleLogout} />}
        </div>
      </div>
    </div>
  );
};
export default Header;
