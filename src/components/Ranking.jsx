import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Tables.css";
import logo from "../assets/OktoplusHZ.png";

function Services() {

    return (
        <div className="general">
            <Header />
            <div className="container">
                <table className="contest-table">
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Name</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Puxar do banco</td>
                            <td>2000</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Puxar do banco</td>
                            <td>1800</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Puxar do banco</td>
                            <td>1600</td>
                        </tr>
                    </tbody>
                </table>
            <div className="logoContainer">
                <img src={logo} alt={"logo"} />
                <h3>congratulates!!!</h3>
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default Services;
