import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Tables.css";
import logo from "../assets/OktoplusHZ.png";

function Services() {
    const [status, setStatus] = useState([]);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        async function fetchList() {
          setRefreshing(true);
          
          let requestOptions = {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
          },
            redirect: 'follow',
          };
    
          fetch(
            'http://localhost:3000/ranking',
            requestOptions
          )
            .then((res) => res.json())
            .then((resJson) => {
              setData(resJson);
              setRefreshing(false);
            })
            .catch((e) => console.log(e));
        }
        if(refreshing) {
          fetchList();
        }
      });

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
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.nsolved * 50} </td>
                            </tr>
                        ))}
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
