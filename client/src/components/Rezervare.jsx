import React from "react";

export default function Rezervare(props){


    return(
        <div className="rezervare--container">
            <h1>Traseu: {props.orasplecare} - {props.orassosire}</h1>
            <h2>Autocar: {props.autocar}</h2>
            <h3>Status cursa: {props.status}</h3>
            <h3>Zi plecare: {props.ziplecare}</h3>
            <h3>Ora plecare: {props.oraplecare}</h3>
            <h3>Ora sosire: {props.orasosire}</h3>
            <p>Loc: {props.loc}</p>
        </div>
    )
}