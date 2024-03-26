import React from "react";
import Header from "../components/Header";
import Rezervare from "../components/Rezervare"
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

    const [rezervari, setRezervari] = React.useState([]);
    const [listaCurse, setListaCurse] = React.useState([])
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])

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

        axios.get(`http://localhost:3002/rezervari/byuser/${user.nume}`).then((response)=>{
            setRezervari(response.data)
        })

        axios.get("http://localhost:3002/curse").then((response)=> {
            setListaCurse(response.data)
        })

        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })

        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })

    }, [authState.id, user.nume])

    const getCursaDetails = (cursaID) => {
        const cursa = listaCurse.find(cursa => cursa.id === cursaID);
        if (cursa) {
            const traseu = listaTrasee.find(traseu => traseu.id === cursa.TraseuID);
            const autocar = listaAutocare.find(autocar => autocar.id === cursa.AutocarID);
            const status = cursa.status
            return { traseu, autocar, cursa };
        }
        return null;
    };

    return (
        <div className="profile--container">
            <Header />
            <div className="profile--tabs">
                <div className="profile--tab">
                    <h1>{user.nume}</h1>
                    <h2>{user.email}</h2>
                    <h3>{user.telefon}</h3>
                </div>
                <div className="profile--tab">
                <h1>Rezervări</h1>
                    {rezervari.map((rezervare, index) => {
                        const { traseu, autocar, cursa } = getCursaDetails(rezervare.CursaID);
                        return (
                            <Rezervare
                                key={index}
                                orasplecare={traseu.oras_pornire}
                                orassosire={traseu.oras_sosire}
                                autocar={autocar.numar_inmatriculare}
                                status={cursa.status}
                                ziplecare={cursa.zi_plecare}
                                oraplecare={cursa.ora_plecare}
                                orasosire={cursa.ora_sosire}
                                loc={rezervare.loc}
                            />
                        );
                    })}
                </div>
            </div>
            
        </div>
    );
}