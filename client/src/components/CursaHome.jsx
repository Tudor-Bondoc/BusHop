import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CursaHome.css"

export default function CursaHome(props) {

    const ziPlecare = new Date(props.ziplecare).toLocaleDateString();

    let navigate = useNavigate()

    return(
        <div className="cursa--container2">
            <h1 className="cursa--traseu2">{props.orasplecare} - {props.orassosire}</h1>
            <p className="cursa--ziplecare2">Zi plecare: {ziPlecare}</p>
            <button className="cursa--buton--rezervare" onClick={()=>navigate(`/adaugare_rezervare/${props.id}`)}>Rezerva</button>
        </div>
    )
}