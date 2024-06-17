import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Rezervare.css";

export default function Rezervare(props){

    const ziPlecare = new Date(props.ziplecare).toLocaleDateString();

    let navigate = useNavigate()
    function HandleCursaClick(status, id) {
      if (status === "in desfasurare") {
        console.log("Status=in desfasurare")
        navigate(`/urmarire_cursa/${id}`)
      }
      else {
        console.log("Faceti click pe o cursa aflata in desfasurare")
      }
    }

    return(
        <div className="rezervare--container" onClick={()=>HandleCursaClick(props.status, props.idCursa)}>
            <h1 className="rezervare--titlu">Traseu: {props.orasplecare} - {props.orassosire}</h1>
            <h2 className="rezervare--detalii">Autocar: {props.autocar}</h2>
            <h2 className="rezervare--detalii">Pret: {props.pret} lei</h2>
            <h3 className="rezervare--status">Status cursa: {props.status}</h3>
            <h3 className="rezervare--orar">Zi plecare: {ziPlecare}</h3>
            <h3 className="rezervare--orar">Ora plecare: {props.oraplecare}</h3>
            <h3 className="rezervare--orar">Ora sosire: {props.orasosire}</h3>
            <p className="rezervare--loc">Loc: {props.loc}</p>
        </div>
    )
}
