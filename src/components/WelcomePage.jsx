import React from "react";
import { useNavigate} from "react-router-dom";
import { getDataStorage, clearAllStorage } from "./Storage";
import Header from "./Header";
import Footer from "./Footer";
// import "./ProblemPage.css";
import logo from "../assets/logokt.png"

const WelcomePage = () => {
    const loggedIn = getDataStorage("logged");
    const email = getDataStorage("email");
    const username = getDataStorage("username");

    const navigate = useNavigate();

    const onButtonClick = (buttonType) => {
        if(buttonType == "logout") {
            clearAllStorage();
            navigate("/");
        } else {
            buttonType == "login" ? navigate("/login") : navigate("/register");
        }
    };

    return (
        <div>
            <Header />
            <div className="mainContainer">
            <div className={"logoContainer1"}>
                    <img src={logo} alt={"logo"} />
            </div>
                <div className={"titleContainer"}>
                    <div>Welcome to Arena, {loggedIn ? (username) : ("rebyata")}!</div>
                </div>
                {/* <div>This is the home page.</div> */}
                <div className={"buttonContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={loggedIn ? () => onButtonClick("logout") : () => onButtonClick("login")}
                        value={loggedIn ? "Logout" : "Login"}
                        id="Buttons"
                    />
                    
                    {loggedIn ? (
                        <div></div>
                    ) : (
                        <input
                            className={"inputButton"}
                            type="button"
                            onClick={() => onButtonClick("register")}
                            value={"Register"}
                            id="Buttons"
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WelcomePage;
