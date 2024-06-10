//Utils
import React from "react";
import { Link } from "react-router-dom"
//Pictures
import Bus from "../../images/bus.png"
//Style
import "../styles/Header.css"

export default function Header() {
    return(
        <>
        <div className="header--container">
            <div className="header--text">
                <Link to="/home" className="bushop--driver">BusHop driver</Link>
                <h2>Keep the world moving</h2>
            </div>
            <img src={Bus} className="header--picture" alt="" />
        </div>
        <div className="header--border">

        </div>
        </>
    )
}