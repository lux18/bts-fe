import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Resgister from "./auth/Register";
import ChecklistItems from "./pages/component/ChecklistItems";

function App() {
  axios.defaults.baseURL = "http://94.74.86.174:8080/api";

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/checklist-items/:id" element={<ChecklistItems />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
