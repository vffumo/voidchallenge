import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './pages/HomePage';
import AnaliseProgresso from "./pages/AnaliseProgresso";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analise-progresso" element={<AnaliseProgresso />} />
        <Route path="/insumos" element={<AnaliseProgresso />} />
      </Routes>
    </Router>
  );
}

export default App;
