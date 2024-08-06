import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logokt.png";
import emailC from "../assets/emailSVG.svg";

function Contact() {

    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="containerAbout">
                    <div className="imagem">
                        <img src={logo} alt={"logo"} />
                    </div>
                    <div className="texto">
                        <h1>Contact Us</h1>
                        <p>
                            If you have any questions or suggestions, please contact us through the email below:
                        </p>
                        <h1>Email</h1>
                        
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Contact;