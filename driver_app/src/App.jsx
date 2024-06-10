//Utils
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { AuthContext } from '../src/helpers/AuthContext'
import axios from "axios";
//Components
import Header from "./components/Header";
import Home from "./pages/Home";
import CursaPage from "./pages/CursaPage";
import Login from "./pages/Login"
import Register from "./pages/Register";

export default function App() {

  const [authState, setAuthState] = React.useState({
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
        setAuthState({
          ...authState,
          status: false
        })
      }
      else {
        setAuthState({
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
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cursa/:id" element={<CursaPage />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  )
}