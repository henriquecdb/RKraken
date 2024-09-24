import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Services.css";
import logo from "../assets/codeforces.png";
import logoOK from "../assets/OktoplusHZ.png";
import { useNavigate } from "react-router-dom";
import { getDataStorage } from "./Storage";

function Services() {
    const loggedIn = getDataStorage("logged");
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onButtonClick = (buttonType) => {

        buttonType == "cfproblens" ? navigate("/cfproblens") : loggedIn ? navigate("/problemlist") : navigate("/login");

    };

    return (
        <div className="general">
            <Header />
            <div className="mainContainer">
                <div className="Servcontainer">
                    <div className="CodeForce">
                        <div className="card">
                            <div className="card-header">
                                <img src={logo} alt={"logo"} />
                            </div>
                            <div className="card-body">
                                <p>These are problems that we recommend doing for training. They are taken from the codeforces platform</p>
                            </div>
                            <div className="card-footer">
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={() => onButtonClick("cfproblens")}
                                    value={"Check problems"}
                                    id="Buttons"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="SendATV">
                        <div className="card">
                            <div className="card-header">
                                <img src={logoOK} alt={"logoOK"} />
                            </div>
                            <div className="card-body">
                                <p>These problems are proposed by the oktoplus team to help with the content depending on the competition</p>
                            </div>
                            <div className="card-footer">
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={() => onButtonClick("problemlist")}
                                    value={"Check problems"}
                                    id="Buttons"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Services;