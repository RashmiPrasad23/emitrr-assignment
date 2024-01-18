import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./core/Home";
import Login from "./core/Login";
import Signup from "./core/Signup";
import Quiz from "./core/Quiz" 
import Dashboard from "./core/Dashboard";
import LeaderBoard from "./core/LeaderBoard";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leaderboard" element={<LeaderBoard/>} />
      </Routes>
    </Router>
  )
}

export default App
