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
        </Routes>
      </Router>
    </div>
  )
}
