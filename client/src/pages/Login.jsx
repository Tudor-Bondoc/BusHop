import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import "../styles/Register.css"

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [parola, setParola] = React.useState("")

    function login() {
        const data = {
            email: email,
            parola: parola
        }
        axios.post("http://localhost:3002/pasageri/login", data).then((response)=>{
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                sessionStorage.setItem("accessToken", response.data)
            }
        })
    }

    return(
        <div className="login--page--container">
            <Link to="/" className="link--form">Home</Link>
            <label>Email</label>
            <input 
                type="text"
                onChange={(event)=>{setEmail(event.target.value)}} 
            />
            <label>Parola</label>
            <input 
                type="password"
                onChange={(event)=>{setParola(event.target.value)}} 
            />
            <p className="already--registered">Nu aveti cont?</p>
            <Link to="/signup" className="link--form">Inregistrare</Link>
            
            <button onClick={login} className="buton--signup">Login</button>

        </div>
    )
}