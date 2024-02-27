import React from "react";
import "../styles/Cursa.css"

export default function Cursa(props) {

    const ziPlecare = new Date(props.ziplecare).toLocaleDateString();

    return(
        <div className="cursa--container">
            <h1 className="cursa--traseu">Traseu: {props.orasplecare} - {props.orassosire}</h1>
            <h1 className="cursa--autocar">Autocar: {props.autocar}</h1>
            <p className="cursa--status">Status: {props.status}</p>
            <p className="cursa--ziplecare">Zi plecare: {ziPlecare}</p>
            <p className="cursa--ziplecare">Ora plecare: {props.oraplecare}</p>
            <p className="cursa--ziplecare">Ora sosire: {props.orasosire}</p>
        </div>
    )
}