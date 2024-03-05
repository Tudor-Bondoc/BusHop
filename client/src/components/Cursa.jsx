import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cursa.css"

export default function Cursa(props) {

    const ziPlecare = new Date(props.ziplecare).toLocaleDateString();

    let navigate = useNavigate()

    return(
        <div className="cursa--container" onClick = {()=>navigate(`/adaugare_rezervare/${props.id}`)}>
            <h1 className="cursa--traseu">Traseu: {props.orasplecare} - {props.orassosire}</h1>
            <p className="cursa--autocar">Autocar: {props.autocar}</p>
            <p className="cursa--status">Status: {props.status}</p>
            <p className="cursa--ziplecare">Zi plecare: {ziPlecare}</p>
            <p className="cursa--ziplecare">Ora plecare: {props.oraplecare}</p>
            <p className="cursa--ziplecare">Ora sosire: {props.orasosire}</p>
        </div>
    )
}