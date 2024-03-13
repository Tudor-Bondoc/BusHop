import React from "react";
import { Link } from "react-router-dom"
import "../styles/Header.css"
import { AuthContext } from '../helpers/AuthContext'

export default function Header() {

    const {authState, setAuthState} = React.useContext(AuthContext)

    const logout = () => {
        sessionStorage.removeItem("accessToken")
        setAuthState({
            nume: "",
            id: 0,
            status: false
        })
    }

    return(
        <div className="header--container">
            <div className="navi">
                <div className="left">
                    <h1 className="logo">BusHop</h1>
                </div>
                <div className="right">
                    {!authState.status && <Link to="/login" className="navi--item">Log in</Link>}
                    {!authState.status && <Link to="/signup" className="navi--item">Sign up</Link>}
                    {authState.status && <p className="navi--item" onClick={logout}>Logout</p>}
                    <h1 className="navi--username">{authState.nume}</h1>
                </div>
            </div>
        </div>
    )
}