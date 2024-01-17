import React from "react";
import Logo from "../../images/bus.png"
import "../styles/Header.css"

export default function Header(){
    return (
        <div className="header--container">
            <h1 className="bushop">BusHop admin</h1>
            <img src={Logo} className="headr--logo"/>
        </div>
    )
}