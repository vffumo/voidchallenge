import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import AnaliseProgresso from "./pages/AnaliseProgresso";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/analise-progresso" element={<AnaliseProgresso />} />
      </Routes>
    </Router>
  );
}

export default App;
