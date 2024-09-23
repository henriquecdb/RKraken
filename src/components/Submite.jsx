import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logokt.png"
import AceEditor from "react-ace";

// Importar temas e linguagens
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-eclipse";

function Submite() {

    const [code, setCode] = useState("");

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };



    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="containerAbout">
                    <div className="imagem">
                        <div className="Enviar">
                            <p>Aqui pensei de puxar a proposta do problema</p>
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
                                onClick={() => onButtonClick("problemlist")}
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