//Utils
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { AuthContext2 } from '../src/helpers/AuthContext'
import axios from "axios";
//Components
import Header from "./components/Header";
import Home from "./pages/Home";
import CursaPage from "./pages/CursaPage";
import Login from "./pages/Login"
import Register from "./pages/Register";

export default function App() {

  const [authState2, setAuthState2] = React.useState({
    nume: "",
    id: 0,
    email: "",
    status: false
  })

  React.useEffect(()=>{
    axios.get("http://localhost:3002/soferi/auth", {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState2({
          ...authState2,
          status: false
        })
      }
      else {
        setAuthState2({
          nume: response.data.nume,
          id: response.data.id,
          email: response.data.email,
          status: true
        })
      }
    })
  }, [])

  return(
    <div>
      <AuthContext2.Provider value={{authState2, setAuthState2}}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cursa/:id" element={<CursaPage />} />
        </Routes>
      </Router>
      </AuthContext2.Provider>
    </div>
  )
}