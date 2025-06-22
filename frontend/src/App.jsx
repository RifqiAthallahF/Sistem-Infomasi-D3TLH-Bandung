import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Webgis from "./pages/Webgis";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="scale-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webgis" element={<Webgis />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
