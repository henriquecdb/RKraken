import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./ProblemList.css"
import Footer from "./Footer";
import { getDataStorage, setDataStorage } from "./Storage";
import { useState, useEffect } from "react";

function ProblemList() {
  const loggedIn = getDataStorage("logged");
  const userId = getDataStorage("userId");
  const [status, setStatus] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      setRefreshing(true);
      
      let requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
      },
        redirect: 'follow',
      };

      fetch(
        'http://localhost:3000/status/' + userId,
        requestOptions
      )
        .then((res) => res.json())
        .then((resJson) => {
          setStatus(resJson);
          setRefreshing(false);
        })
        .catch((e) => console.log(e));
    }
    if(refreshing) {
      fetchStatus();
    }
  });

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
        'http://localhost:3000/problems',
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
        <div className="square">
          <div className="list">
            {data.map((item, i) => (
              <div key={item.id}>
                <Link to="/problem" state={{id : item.id}}>{item.id}. {item.name}. {status.map((value, i) => (
                  value.fk_problem == item.id ? ("(" + value.status + ")") : ("")
                ))}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div> 
    
  );
}

export default ProblemList;