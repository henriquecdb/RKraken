import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/escritaokt.png";
import Header from "./Header";
import Footer from "./Footer";

const Recover = () => {
    const location = useLocation();
    const recoverEmail = location.state.email;
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    const navigate = useNavigate();

    const onChangePassword = () => {
        setEmailError("");
        setCurrentPasswordError("");
        setNewPasswordError("");

        if ("" === currentPassword) {
            setCurrentPasswordError("Please enter a new password");
            return;
        }

        if (currentPassword.length < 7) {
            setCurrentPasswordError(
                "The password must be 8 characters or longer"
            );
            return;
        }

        if ("" === newPassword) {
            setNewPasswordError("Please enter your new password again");
            return;
        }

        if (newPassword.length < 7) {
            setNewPasswordError(
                "The password must be 8 characters or longer"
            );
            return;
        }

        if (newPassword != currentPassword) {
            setNewPasswordError("Passwords must be the same");
            return;
        }

        fetch("http://localhost:3000/recover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: recoverEmail,
                currentPassword: currentPassword,
                newPassword: newPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    navigate("/");
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Ocorreu um erro ao tentar alterar a senha.");
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
                
                <div className={"inputContainer"}>
                    <input
                        type="password"
                        value={currentPassword}
                        placeholder="Please enter a new password"
                        onChange={(ev) => setCurrentPassword(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{currentPasswordError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        type="password"
                        value={newPassword}
                        placeholder="Enter your new password again"
                        onChange={(ev) => setNewPassword(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{newPasswordError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onChangePassword}
                        value={"Change Password"}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Recover;