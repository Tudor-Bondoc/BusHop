import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRezervare from "./pages/AddRezervare";

export default function App() {
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/adaugare_rezervare/:id" element={<AddRezervare />} />
        </Routes>
      </Router>
    </div>
  )
}
