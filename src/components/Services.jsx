import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Services.css";

function Services() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div className="general">
            <Header />
            <div className="mainContainer">
                <div className="Servcontainer">
                    <div className="CodeForce">
                        <h1>teste</h1>
                    </div>
                    <div className="SendATV">
                        <h1>teste</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Services;