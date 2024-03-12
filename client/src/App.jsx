import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRezervare from "./pages/AddRezervare";
import { AuthContext } from '../src/helpers/AuthContext'
import axios from "axios";

export default function App() {

  const [authState, setAuthState] = React.useState(false)

  React.useEffect(()=>{
    axios.get("http://localhost:3002/pasageri/auth", {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState(false)
      }
      else {
        setAuthState(true)
      }
    })
  }, [])

  return(
    <div>
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/adaugare_rezervare/:id" element={<AddRezervare />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  )
}
