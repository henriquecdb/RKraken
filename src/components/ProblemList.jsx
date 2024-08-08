import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./ProblemList.css"
import Footer from "./Footer";
import { getDataStorage, setDataStorage } from "./Storage";
import { useState, useEffect } from "react";

function ProblemList() {
  const loggedIn = getDataStorage("logged");
  
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
                <Link to="/problem" state={{id : item.id}}>{item.id}. {item.name}</Link>
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
