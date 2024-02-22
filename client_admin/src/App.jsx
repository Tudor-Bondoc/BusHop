import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Header from "./components/Header";
import Trasee from "./pages/Trasee";
import NewTrasee from "./pages/NewTrasee"
import Home from "./pages/Home";
import Autocare from "./pages/Autocare";
import Curse from "./pages/Curse";
import AddTraseu from "./pages/AddTraseu"
import AddAutocar from "./pages/AddAutocar";
import AddCursa from "./pages/AddCursa";
import CurseRezervari from "./pages/CurseRezervari";
import CursaPage from "./pages/CursaPage";

export default function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curse" element={<Curse />} />
          <Route path="/trasee" element={<NewTrasee />} />
          <Route path="/autocare" element={<Autocare />} />
          <Route path="/rezervari" element={<CurseRezervari />} />
          <Route path="/adaugare_traseu" element={<AddTraseu />} />
          <Route path="/adaugare_autocar" element={<AddAutocar />} />
          <Route path="/adaugare_cursa" element={<AddCursa />} />
          <Route path="/curse/:id" element={<CursaPage />} />
        </Routes>
      </Router>
    </div>
  )
}
