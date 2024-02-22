import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CursaRezervari from "../components/CursaRezervari"; 
import "../styles/Cursa.css"

export default function CursaPage() {

    let { id } = useParams()

    const [value, setValue] = React.useState([])
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])

    React.useEffect(() => {

        axios.get(`http://localhost:3002/curse/${id}`).then((response)=> {
            setValue(response.data)
        })

        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })

        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })

    }, [])

    const traseuSelectat = listaTrasee.find(traseu => traseu.id === value.TraseuID)
    if (!traseuSelectat) {
        return <p>Traseul nu a fost găsit încă.</p>;
    }

    const autocarSelectat = listaAutocare.find(autocar => autocar.id === value.AutocarID)
    if (!autocarSelectat) {
        return <p>Autocarul nu a fost găsit încă.</p>;
    }

    return(
        <div className="cursa--page--container">
            <div className="cursa--page--left--side">
                <CursaRezervari
                    id = {value.id}
                    /*key = {value.id}*/
                    ziplecare = {value.zi_plecare}
                    oraplecare = {value.ora_plecare}
                    orasosire = {value.ora_sosire}
                    orasplecare = {traseuSelectat.oras_pornire}
                    orassosire = {traseuSelectat.oras_sosire}
                    autocar = {autocarSelectat.numar_inmatriculare}
                    status = {value.status}
                />
            </div>
            <div className="cursa--page--right--side">
                <button className="buton--rezervare">Adauga rezervare</button>
            </div>
        </div>
    )
}