import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import "../styles/Register.css"
import { AuthContext } from '../helpers/AuthContext'

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [parola, setParola] = React.useState("")
    const {authState, setAuthState} = React.useContext(AuthContext)

    let navigate = useNavigate()

    function login() {
        const data = {
            email: email,
            parola: parola
        }
        axios.post("http://localhost:3002/soferi/login", data).then((response)=>{
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                sessionStorage.setItem("accessToken", response.data.token)
                setAuthState({
                    nume: response.data.nume,
                    id: response.data.id,
                    email: response.data.email,
                    status: true
                })
                navigate("/home")
            }
        })
    }

    return(
        <div className="login--page--container">
            <div className="login--form">
            <div className="login--header">
                <h1 className="login--header--title">BusHop</h1>
            </div>
            <Link to="/home" className="link--form">Home</Link>
            <label className="login--label">Email</label>
            <input 
                type="text"
                className="login--input"
                onChange={(event)=>{setEmail(event.target.value)}} 
            />
            <label className="login--label">Parola</label>
            <input 
                type="password"
                className="login--input"
                onChange={(event)=>{setParola(event.target.value)}} 
            />
            <p className="already--registered">Nu aveti cont?</p>
            <Link to="/register" className="link--form">Inregistrare</Link>
            
            <button onClick={login} className="buton--signup">Login</button>
            </div>
        </div>
    )
}