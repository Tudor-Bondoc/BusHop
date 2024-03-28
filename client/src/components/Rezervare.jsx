import React from "react";
import "../styles/Rezervare.css";

export default function Rezervare(props){
    return(
        <div className="rezervare--container">
            <h1 className="rezervare--titlu">Traseu: {props.orasplecare} - {props.orassosire}</h1>
            <h2 className="rezervare--detalii">Autocar: {props.autocar}</h2>
            <h3 className="rezervare--status">Status cursa: {props.status}</h3>
            <h3 className="rezervare--orar">Zi plecare: {props.ziplecare}</h3>
            <h3 className="rezervare--orar">Ora plecare: {props.oraplecare}</h3>
            <h3 className="rezervare--orar">Ora sosire: {props.orasosire}</h3>
            <p className="rezervare--loc">Loc: {props.loc}</p>
        </div>
    )
}
