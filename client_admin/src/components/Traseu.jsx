import React from "react";
import Trash from "../../images/trash.png"
import "../styles/Traseu.css"

export default function Traseu(props){
    return(
        <div className="traseu--container" /*onClick={() => props.onClick()}*/>
            <h1 className="oras">Oras pornire: {props.oras_pornire}</h1>
            {props.oras_1 && <h1 className="oras">Prima oprire: {props.oras_1}</h1>}
            {props.oras_2 && <h1 className="oras">A doua oprire: {props.oras_2}</h1>}
            {props.oras_3 && <h1 className="oras">A treia oprire: {props.oras_3}</h1>}
            <h1 className="oras">Oras destinatie: {props.oras_sosire}</h1>
            <img src={Trash} className="trash" />
        </div>
    )
}