import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./../components/authentication/LogoutButton";
import LoginButton from "./../components/authentication/LoginButton";

import "./../style/Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    //showButton();
  }, []);

  function checkUser() {
    if (localStorage.getItem("token") === null) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          CETRALAND <i className="fab fab-typo3" />
        </Link>
        <div className="nav-bar-container">
          <div className="menu-icon" color="yellow" onClick={handleClick}>
            Menu
            <i className={click ? "fas fa-times" : " fas fas-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : " nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/map" className="nav-links" onClick={closeMobileMenu}>
                Map
              </Link>
            </li>

            {checkUser() ? <LogoutButton /> : <LoginButton />}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
