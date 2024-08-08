import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import "./ProblemList.css"
import Footer from "./Footer";
import { getDataStorage } from "./Storage";
import { useState, useEffect } from "react";

function ProblemList() {
  const loggedIn = getDataStorage("logged");

  if(!loggedIn) {

  }
  
  const [data, setData] = useState();
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

  if(data) {
    console.log(data);
  }

  function displayProblems(data) {
    forEach(item => {
      const dataItem = document.createElement('div', className = "general");
      
      const navlink = document.createElement('NavLink');
      navlink.textContent = `${item.id}. ${item.name}`; 
    })
  }

  return (

    <div className="general">
      <Header />
      <div className="container">
        <div className="square">
          <div className="list">
            <div>
              <NavLink to="/problemA">A. Problem A</NavLink>
            </div>
            <div>
              <NavLink to="/problemB">B. Problem B</NavLink>
            </div>
            <div>
              <NavLink to="/problemC">C. Problem C</NavLink>
            </div>
            <div>
              <NavLink to="/problemD">D. Problem D</NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div> 
    
    
  );
}

export default ProblemList;
