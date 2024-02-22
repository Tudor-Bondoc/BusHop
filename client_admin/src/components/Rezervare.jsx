import React from "react";
import "../styles/Rezervare.css"

export default function Rezervare(props) {
    return(
        <div className="rezervare--container">
            <h1 className="rezervare--nume">Pasager: {props.nume}</h1>
            <p className="rezervare--loc">Loc: {props.loc}</p>
        </div>
    )
}