import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProblemPage.css";

const WelcomePage = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = (buttonType) => {
    buttonType == "login" ? navigate("/login") : navigate("/register");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome to Arena, rebyata!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={() => onButtonClick("login")}
          value={loggedIn ? "Logout" : "Login"}
        />
        <input
          className={"inputButton"}
          type="button"
          onClick={() => onButtonClick("register")}
          value={"Register"}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default WelcomePage;
