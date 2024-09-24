import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getDataStorage } from "./Storage";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logokt.png"
import AceEditor from "react-ace";

// Importar temas e linguagens
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-eclipse";

function Submite() {
    const userId = getDataStorage("userId");
    const [code, setCode] = useState("#include <iostream>\n\nusing namespace std;\n\nint main() {\n\t/*Paste your code here*/\n\treturn 0;\n}");

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const location = useLocation();
    const id = location.state.id;
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    const setQuestionStatus = (status) => {
        fetch("http://localhost:3000/set-problem-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                problemId: id,
                status: status,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.message);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("error");
            });
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

    const sendSolution = () => {
        fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
                problemId: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setQuestionStatus(data.message);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("error");
            });
        
        navigate("/problemlist");
    }

    console.log(data);

    if(data.length > 0) {
        console.log(data[0]["name"]);
    }

    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="containerAbout">
                    <div className="imagem">
                        <div className="Enviar">
                            {data.length ? (<p>{data[0]["id"]} - {data[0]["name"]}</p>) : (<div></div>) }
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                name="code-editor"
                                value={code}
                                onChange={handleCodeChange}
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}
                                width="100%"
                                height="300px"
                            />

                            <input
                                className={"inputButton"}
                                type="button"
                                onClick={sendSolution}
                                value={"Send solution"}
                                id="Buttons"
                            />
                        </div>
                    </div>
                    <div className="texto">
                        <img src={logo} alt={"logo"} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Submite;