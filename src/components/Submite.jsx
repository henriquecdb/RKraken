import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logokt.png"

function Submite() {

    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Seleciona o primeiro arquivo
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            // Você pode enviar esse formData para um backend
            // Aqui está um exemplo de como enviar via fetch
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error("Erro:", error));
        }
    };

    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="containerAbout">
                    <div className="imagem">
                        <div className="Enviar">
                            <p>Aqui pensei de puxar a proposta do problema</p>
                            <form onSubmit={handleSubmit}>
                                <input type="file" onChange={handleFileChange} />
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={() => onButtonClick("submite")}
                                    value={"Submite"}
                                    id="Buttons"
                                />
                            </form>

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