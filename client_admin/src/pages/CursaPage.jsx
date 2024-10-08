import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CursaRezervari from "../components/CursaRezervari"; 
import "../styles/Cursa.css"
import Rezervare from "../components/Rezervare";

export default function CursaPage() {

    let { id } = useParams()
    let navigate = useNavigate()

    const [value, setValue] = React.useState([])
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])
    const [listaRezervari, setListaRezervari] = React.useState([])

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

        axios.get(`http://localhost:3002/rezervari/${id}`).then((response)=> {
            setListaRezervari(response.data)
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

    const lista = listaRezervari.map((value, key) => {
        return (
            <Rezervare
                key = {value.id}
                nume = {value.nume}
                loc = {value.loc}
            />
        )
    })

    const clickHanlder = () => {
        console.log("s-a apasat")
        navigate(`/adaugare_rezervare/${id}`)
    }

    return(
        <div>
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
                    pret = {value.pret}
                />
            </div>
            <div className="cursa--page--right--side">
                <button className="buton--rezervare" onClick={clickHanlder}>Adauga rezervare</button>
            </div>
        </div>
        {lista}
        </div>
    )
}