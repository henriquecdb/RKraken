import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../assets/logokt.png";
import emailC from "../assets/emailSVG.svg";

function Contact() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(result);
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email.");
        }
    };

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
                            If you have any questions or suggestions, please
                            contact us through the email below:
                        </p>

                        <div className="emailContainer">
                            <img src={emailC} alt="emailC" />
                            <h4>contact.rkraken@gmail.com</h4>
                        </div>

                        <h2>Or fill out the form below:</h2>

                        <div className="formContainer">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="nome"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name"
                                />

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                />

                                <textarea
                                    id="mensagem"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Type your message"
                                />

                                <div className="inputContainer">
                                    <input
                                        className="inputButton"
                                        type="submit"
                                        value="Send Message"
                                        id="Buttons"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
