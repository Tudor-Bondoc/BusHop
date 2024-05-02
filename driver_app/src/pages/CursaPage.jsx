//Utils
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//Components
import Cursa from "../components/Cursa";
//Style
import "../styles/CursaPage.css"

export default function CursaPage() {

    const {id} = useParams()
    const [cursaDetails, setCursaDetails] = React.useState({})
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])

    React.useEffect(()=>{
        axios.get(`http://localhost:3002/curse/${id}`).then((response)=> {
            setCursaDetails(response.data)
        })
        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })
        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })
    }, [])

    const traseuSelectat = listaTrasee.find(traseu => traseu.id === cursaDetails.TraseuID)
    if (!traseuSelectat) {
        return <p>Traseul nu a fost găsit încă.</p>;
    }

    const autocarSelectat = listaAutocare.find(autocar => autocar.id === cursaDetails.AutocarID)
    if (!autocarSelectat) {
        return <p>Autocarul nu a fost găsit încă.</p>;
    }

    async function startCursa() {
        let newCursaDetails = {...cursaDetails, status: "in desfasurare"}
        try {
            await axios.put(`http://localhost:3002/curse/${id}`, newCursaDetails)
            window.location.reload()
        } catch (error) {
            console.error("Eroare la actualizarea cursei:", error);
        }
    }

    async function stopCursa() {
        let newCursaDetails = {...cursaDetails, status: "finalizata"}
        try {
            await axios.put(`http://localhost:3002/curse/${id}`, newCursaDetails)
            window.location.reload()
        } catch (error) {
            console.error("Eroare la actualizarea cursei:", error);
        }
    }

    return(
        <div className="cursapage--container">
            <Cursa
                id = {cursaDetails.id}
                orasplecare = {traseuSelectat.oras_pornire}
                orassosire = {traseuSelectat.oras_sosire}
                autocar = {autocarSelectat.numar_inmatriculare}
                ziplecare = {cursaDetails.zi_plecare}
                oraplecare = {cursaDetails.ora_plecare}
                orasosire = {cursaDetails.ora_sosire}
                status = {cursaDetails.status}
            />
            <button onClick={startCursa} className="buton--start">Start cursa</button>
            <button onClick={stopCursa} className="buton--start">Finalizare cursa</button>
        </div>
    )
}