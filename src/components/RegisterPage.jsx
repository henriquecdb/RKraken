import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/escritaokt.png";
import Header from "./Header";
import Footer from "./Footer";


const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        if ("" === name) {
            setNameError("Please enter your name");
            return;
        }

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

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                navigate("/login");
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
                <div className={"titleContainer"}>
                    {/*<div>Register</div>*/}
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={name}
                        placeholder="Enter your name here"
                        onChange={(ev) => setName(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{nameError}</label>
                </div>
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
                <br />
                <div className={"inputContainer"}>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm your password here"
                        onChange={(ev) => setConfirmPassword(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{confirmPasswordError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={"Register"}
                        id="Buttons"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;
