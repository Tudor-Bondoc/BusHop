import React from "react";
import { Link } from "react-router-dom"
import "../styles/Header.css"
import { AuthContext } from '../helpers/AuthContext'

export default function Header() {

    const {authState} = React.useContext(AuthContext)

    return(
        <div className="header--container">
            <div className="navi">
                <div className="left">
                    <h1 className="logo">BusHop</h1>
                </div>
                <div className="right">
                    {!authState && <Link to="/login" className="navi--item">Log in</Link>}
                    {!authState && <Link to="/signup" className="navi--item">Sign up</Link>}
                    {authState && <p className="navi--item">Logout</p>}
                </div>
            </div>
        </div>
    )
}