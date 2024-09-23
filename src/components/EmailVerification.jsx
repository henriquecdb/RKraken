import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/escritaokt.png";
import Header from "./Header";
import Footer from "./Footer";

const Recover = () => {
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [userVerificationCode, setUserVerificationCode] = useState("");
    const [verificationError, setVerificationError] = useState("");

    const navigate = useNavigate();

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    const changePassword = () => {
        let verificationCode = "";

        let requestOptions = {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
          },
            redirect: 'follow',
          };
    
          fetch(
            'http://localhost:3000/get-verification-code/'+email,
            requestOptions
          )
            .then((res) => res.json())
            .then((data) => {
                if(data.success) {
                   verificationCode = data.code;

                    if(verificationCode == userVerificationCode) {
                        navigate("/recover", { state: { email: email } });
                    } else {
                        alert("Codigo de verificacao incorreto");
                        setEmail("");
                        setUserVerificationCode("");
                        setVerified(false);
                        return;
                    }
                } else {
                    alert(data.message);
                    setVerified(false);
                }
            })
            .catch((e) => console.log(e));

    };

    const sendVerificationCode = () => {
        setEmailError("");

        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        const verificationCode = getRndInteger(0, 999999);

        fetch("http://localhost:3000/set-verification-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                code: verificationCode
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setVerified(true);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while trying to send the verification code.");
            });
    };

    return (
        <div>
        {verified ? (
            <div>
            <Header />
            <div className={"mainContainer"}>
                <div className={"logoContainer"}>
                    <a href="/">
                        <img src={logo} alt={"logo"} />
                    </a>
                </div>
                <div>Enter the verification code we sent to your email</div>
                <div className={"inputContainer"}>
                    <input
                        value={userVerificationCode}
                        placeholder="Verification code"
                        onChange={(ev) => setUserVerificationCode(ev.target.value)}
                        className={"inputBox"}
                    />
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={changePassword}
                        value={"Change Password"}
                    />
                </div>
            </div>
            <Footer />
        </div>
        ) : (
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
                        value={email}
                        placeholder="Enter your email"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={"inputBox"}
                    />
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={sendVerificationCode}
                        value={"Send Verification Code"}
                    />
                </div>
            </div>
            <Footer />
        </div>
        )}
        </div>
    );
};

export default Recover;