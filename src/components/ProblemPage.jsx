import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function ProblemPage() {
  return (
    <div className="general">
      <Header />
      <div className="container">
        <div className="square">
          <div>
            <h2>Problem Name</h2>
            <p>Problem Description</p>
            <p>Input Description</p>
            <p>Output Description</p>
            <p>Sample testcase</p>
            <input type="button" value="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;
