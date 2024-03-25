import React from "react";
import Header from "../components/Header";
import { AuthContext } from '../helpers/AuthContext';
import "../styles/Profile.css";

export default function Profile() {
    
    const { authState } = React.useContext(AuthContext);

    return (
        <div className="profile--container">
            <Header />
            <div className="profile--tabs">
                <div className="profile--tab">Date personale</div>
                <div className="profile--tab">Rezervări</div>
            </div>
            <div className="profile--content">
                {/* Aici va fi afișat conținutul tab-ului selectat */}
            </div>
        </div>
    );
}