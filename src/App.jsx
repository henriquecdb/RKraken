import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import "./App.css";
import RegisterPage from "./components/RegisterPage";
import ProblemPage from "./components/ProblemPage";
import ProblemList from "./components/ProblemList";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {

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
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
