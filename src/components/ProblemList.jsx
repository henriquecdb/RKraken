import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import "./ProblemList.css"

function ProblemList() {
  return (
    <div className="general">
      <Header />
      <div className="container">
        <div className="square">
          <div className="list">
            <div>
              <NavLink to="/problemA">A. Problem A</NavLink>
            </div>
            <div>
              <NavLink to="/problemB">B. Problem B</NavLink>
            </div>
            <div>
              <NavLink to="/problemC">C. Problem C</NavLink>
            </div>
            <div>
              <NavLink to="/problemD">D. Problem D</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemList;
