import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import "./App.css";
import { useEffect, useState } from "react";
import RegisterPage from "./components/RegisterPage";
import ProblemPage from "./components/ProblemPage";
import ProblemList from "./components/ProblemList";
import Services from "./components/Services";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/problem" element={<ProblemPage />} />
                    <Route path="/problemlist" element={<ProblemList />} />
                    <Route path="/services" element={<Services />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
