import React from "react";
import { NavLink } from "react-router-dom";
import { getDataStorage } from "./Storage";
import "./Header.css";

function Header() {
  const loggedIn = getDataStorage("logged");
  let problemListHeader = "/problemlist";

  if(!loggedIn) {
    problemListHeader = "/login"
  }

  return (
    <header>
      <nav>
        <ul className="header-list">
          <li>
            <NavLink to="/">[ Home ]</NavLink>
          </li>
          <li>
            <NavLink to={problemListHeader}>[ Problems ]</NavLink>
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
