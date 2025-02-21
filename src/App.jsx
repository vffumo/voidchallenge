import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import WeeklyTasksReport from "./pages/AnaliseProgresso";
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/analise-progresso" element={<WeeklyTasksReport />} />
      </Routes>
    </Router>
  );
}

export default App;
