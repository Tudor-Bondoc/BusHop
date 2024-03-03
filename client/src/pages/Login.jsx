import React from "react";
import axios from "axios";

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [parola, setParola] = React.useState("")

    function login() {
        const data = {
            email: email,
            parola: parola
        }
        axios.post("http://localhost:3002/pasageri/login", data).then((response)=>{
            console.log(response.data)
        })
    }

    return(
        <div className="login--page--container">
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
            
            <button onClick={login}>Login</button>

        </div>
    )
}