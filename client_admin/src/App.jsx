import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Header from "./components/Header";
import Trasee from "./pages/Trasee";

export default function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Trasee />} />
          <Route path="/curse" element={<Trasee />} />
          <Route path="/trasee" element={<Trasee />} />
          <Route path="/autocare" element={<Trasee />} />
          <Route path="/rezervari" element={<Trasee />} />
        </Routes>
      </Router>
    </div>
  )
}
