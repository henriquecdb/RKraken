import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import "./ProblemPage.css";
import logo from "../assets/logokt.png"

const WelcomePage = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = (buttonType) => {
        buttonType == "login" ? navigate("/login") : navigate("/register");
    };

    return (
        <div>
            <Header />
            <div className="mainContainer">
            <div className={"logoContainer1"}>
                    <img src={logo} alt={"logo"} />
            </div>
                <div className={"titleContainer"}>
                    <div>Welcome to Arena, rebyata!</div>
                </div>
                {/* <div>This is the home page.</div> */}
                <div className={"buttonContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={() => onButtonClick("login")}
                        value={loggedIn ? "Logout" : "Login"}
                        id="Buttons"
                    />
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={() => onButtonClick("register")}
                        value={"Register"}
                        id="Buttons"
                    />
                    {loggedIn ? (
                        <div>Your email address is {email}</div>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WelcomePage;
