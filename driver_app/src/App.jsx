//Utils
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
//Components
import Header from "./components/Header";
import Home from "./pages/Home";
import CursaPage from "./pages/CursaPage";

export default function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursa/:id" element={<CursaPage />} />
        </Routes>
      </Router>
    </div>
  )
}