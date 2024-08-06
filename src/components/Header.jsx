import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <ul className="header-list">
          <li>
            <NavLink to="/">[ Home ]</NavLink>
          </li>
          <li>
            <NavLink to="/problemlist">[ Problems ]</NavLink>
          </li>
          <li>
            <NavLink to="/about">[ About ]</NavLink>
          </li>
          <li>
            <NavLink to="/services">[ Services ]</NavLink>
          </li>
          <li>
            <NavLink to="/contact">[ Contact ]</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
