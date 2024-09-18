import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/escritaokt.png";
import Header from "./Header";
import Footer from "./Footer";
import { setDataStorage, getDataStorage } from "./Storage";

const LoginPage = () => {
    const loggedIn = getDataStorage("logged");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
        setEmailError("");
        setPasswordError("");

        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.loggedIn) {
                    setDataStorage("logged", true);
                    setDataStorage("email", email);
                    setDataStorage("username", data.user.name);
                    navigate("/");
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <Header />
            <div className={"mainContainer"}>
                <div className={"logoContainer"}>
                    <a href="/">
                        <img src={logo} alt={"logo"} />
                    </a>
                </div>

                <div className={"titleContainer"}>{/*<div>Login</div>*/}</div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <div className="inputContainer">
                    <Link to="/emailverification">
                        Forgot your password? Change it here
                    </Link>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={"Login"}
                        id="Buttons"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
