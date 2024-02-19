import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Header from "./components/Header";
import Trasee from "./pages/Trasee";
import Home from "./pages/Home";
import Autocare from "./pages/Autocare";
import AddTraseu from "./pages/AddTraseu"
import AddAutocar from "./pages/AddAutocar";
import AddCursa from "./pages/AddCursa";

export default function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curse" element={<Trasee />} />
          <Route path="/trasee" element={<Trasee />} />
          <Route path="/autocare" element={<Autocare />} />
          <Route path="/rezervari" element={<Trasee />} />
          <Route path="/adaugare_traseu" element={<AddTraseu />} />
          <Route path="/adaugare_autocar" element={<AddAutocar />} />
          <Route path="/adaugare_cursa" element={<AddCursa />} />
        </Routes>
      </Router>
    </div>
  )
}
