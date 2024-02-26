import React from "react";
import "../styles/Header.css"

export default function Header() {
    return(
        <div className="header--container">
            <div className="navi">
                <div className="left">
                    <h1 className="logo">BusHop</h1>
                </div>
                <div className="right">
                    <p className="navi--item">Log in</p>
                    <p className="navi--item">Sign up</p>
                </div>
            </div>
        </div>
    )
}