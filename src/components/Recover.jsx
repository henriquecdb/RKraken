import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Recover = () => {
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

        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === currentPassword) {
            setCurrentPasswordError("Please enter your current password");
            return;
        }

        if (currentPassword.length < 7) {
            setCurrentPasswordError(
                "The current password must be 8 characters or longer"
            );
            return;
        }

        if ("" === newPassword) {
            setNewPasswordError("Please enter a new password");
            return;
        }

        if (newPassword.length < 7) {
            setNewPasswordError(
                "The new password must be 8 characters or longer"
            );
            return;
        }

        fetch("http://localhost:3000/recover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
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
                <h2>Change Password</h2>
                <div className={"inputContainer"}>
                    <input
                        value={email}
                        placeholder="Enter your email"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        type="password"
                        value={currentPassword}
                        placeholder="Enter your current password"
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
                        placeholder="Enter your new password"
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
