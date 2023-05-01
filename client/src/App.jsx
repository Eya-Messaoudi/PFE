import "./App.css";
import { Route, Routes, routes } from "react-router-dom";
import NavFoot from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
const App = () => {
  return (
    <div className="App">
      <NavFoot />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Blog" element={<Blog />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
