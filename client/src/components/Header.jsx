import React from "react";
import { Link } from "react-router-dom"
import "../styles/Header.css"

export default function Header() {
    return(
        <div className="header--container">
            <div className="navi">
                <div className="left">
                    <h1 className="logo">BusHop</h1>
                </div>
                <div className="right">
                    <Link to="/login" className="navi--item">Log in</Link>
                    <Link to="/signup" className="navi--item">Sign up</Link>
                </div>
            </div>
        </div>
    )
}