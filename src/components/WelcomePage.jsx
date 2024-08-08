import React from "react";
import { useNavigate} from "react-router-dom";
import { getDataStorage, clearAllStorage } from "./Storage";
import Header from "./Header";
import Footer from "./Footer";
// import "./ProblemPage.css";

const WelcomePage = () => {
    const loggedIn = getDataStorage("logged");
    const email = getDataStorage("email");

    console.log(email);
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
                <div className={"titleContainer"}>
                    <div>Welcome to Arena, rebyata!</div>
                </div>
                {/* <div>This is the home page.</div> */}
                <div className={"buttonContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={loggedIn ? () => onButtonClick("logout") : () => onButtonClick("login")}
                        value={loggedIn ? "Logout" : "Login"}
                    />
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={() => onButtonClick("register")}
                        value={"Register"}
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
