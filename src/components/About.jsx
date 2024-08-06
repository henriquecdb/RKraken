import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logokt.png"

function About() {

    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="containerAbout">
                    <div className="imagem">
                        <img src={logo} alt={"logo"} />
                    </div>
                    <div className="texto">
                        <h1>Whats`s RKraken?</h1>
                        <p>
                            Kraken, initially, was a project carried out in the disciplines of software modeling, database and web development at CEFET-MG.
                            The central idea of ​​the project was to unify several competitive programming platforms into one. Furthermore, with the aim of stimulating
                            healthy competition among extension project students, the platform has a ranking.
                        </p>
                        <h1>Project Context</h1>
                        <p>The Kraken project was developed with the aim of providing an efficient, simple and user-friendly environment for competitive programming
                            enthusiasts. The idea is to allow Oktoplus members to learn, practice and participate in competitions, all on a single platform.
                            The project was inspired by the need for a platform of its own that offers a wide range of problems and regular competitions to keep users
                            engaged and motivated.
                        </p>
                    </div>
                </div>
            </div>
                <Footer />
        </div>
    );
}

export default About;