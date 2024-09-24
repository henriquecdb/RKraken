import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function ProblemPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state.id;
  
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  function submitPage() {
    navigate("/submite", { state: { id: id } });
  }

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
        'http://localhost:3000/problems/'+id,
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
          <div>
            {data.map((item, i) => (
              <div key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                </div>
                <div>
                  <p>{item.description}</p>
                </div>
                <div>
                  <p>{item.input}</p>
                </div>
                <div>
                  <p>{item.output}</p>
                </div>
                <div>
                  <p>{item.testcase}</p>
                </div>
                <input type="button" value="Submit" onClick={submitPage}/>
              </div>  
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProblemPage;
