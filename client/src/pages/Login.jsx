import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import "../styles/Register.css"
import { AuthContext } from '../helpers/AuthContext'

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [parola, setParola] = React.useState("")
    const {setAuthState} = React.useContext(AuthContext)

    let navigate = useNavigate()

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
                setAuthState(true)
                navigate("/")
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