import React from "react";
import { Link } from "react-router-dom"
import "../styles/Header.css"
import { AuthContext } from '../helpers/AuthContext'
import accountPick from '../../images/accountj2.png'

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
                    {authState.status && <img src={accountPick} className="account--logo"></img>}
                    {authState.status &&
                        <div className="profile--hover">
                            <h1 className="profile--username">{authState.nume}</h1>
                            <h2 className="profile--link">Profil</h2>
                            <h3 className="profile--logout" onClick={logout}>Logout</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}