import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import WeeklyTasksReport from "./pages/AnaliseProgresso";
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/analise-progresso" element={<WeeklyTasksReport />} />
        {/* <Route path="/other-data" element={<OtherDataReport />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
