import React from "react";
import Header from "../components/Header";
import { AuthContext } from '../helpers/AuthContext';
import axios from "axios";
import "../styles/Profile.css";

export default function Profile() {

    const { authState } = React.useContext(AuthContext);
    const [user, setUser] = React.useState(
        {
            nume: "",
            email: "",
            telefon: ""
        }
    )

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/pasageri/${authState.id}`);
            if (response.data.error)
                console.log("Aici e problema")
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    React.useEffect(()=>{
        getUserData()
    }, [])

    return (
        <div className="profile--container">
            <Header />
            <div className="profile--tabs">
                <div className="profile--tab">
                    <h1>{user.nume}</h1>
                    <h2>{user.email}</h2>
                    <h3>{user.telefon}</h3>
                </div>
                <div className="profile--tab">Rezervări</div>
            </div>
            <div className="profile--content">
                {/* Aici va fi afișat conținutul tab-ului selectat */}
            </div>
        </div>
    );
}