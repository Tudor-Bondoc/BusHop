import React from "react";
import "../styles/Autocar.css"

export default function Autocar(props){
    return(
        <div className="autocar--container" /*onClick={() => props.onClick()}*/>
            <div className="left--side">
                <h1 className="marca">{props.marca}</h1>
                <p className="numar--inmatriculare">{props.numar_inmatriculare}</p>
            </div>
            <div className="right--side">
                <h1 className="numar--locuri">Numar locuri: {props.numar_locuri}</h1>
            </div>
        </div>
    )
}