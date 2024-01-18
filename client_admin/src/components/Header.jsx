import React from "react";
import { Link } from "react-router-dom"
import Logo from "../../images/bus.png"
import "../styles/Header.css"

export default function Header(){
    return (
        <div className="header--container">
            <Link to="/" className="bushop">BusHop admin</Link>
            <div className="navbar--container">
                <Link to="/curse" className="nav--link">Curse</Link>
                <Link to="/trasee" className="nav--link">Trasee</Link>
                <Link to="/autocare" className="nav--link">Autocare</Link>
                <Link to="/rezervari" className="nav--link">Rezervari</Link>
            </div>
            <img src={Logo} className="headr--logo"/>
        </div>
    )
}