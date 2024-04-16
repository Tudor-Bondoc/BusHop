import React from "react";
import "../styles/Cursa.css"
import Trash from "../../images/trash.png"
import Road from "../../images/road2.png"
import Bus from "../../images/busicon2.png"
import Calendar from "../../images/calendar2.png"
import Clock from "../../images/clock2.png"
import Status from "../../images/status.png"
import axios from "axios";

export default function Cursa(props) {

    const ziPlecare = new Date(props.ziplecare).toLocaleDateString();

    //Handler pentru stergere cursa
    const handleDeleteCursa = async (id) => {

        try {
            await axios.delete(`http://localhost:3002/curse/${id}`);
            window.location.reload()
        } catch (error) {
            console.error("Eroare la ștergerea cursei cu id-ul :", id, error);
        }
    }

    return(
        <div className="cursa--container">
            {/*
            <h1 className="cursa--traseu">Traseu: {props.orasplecare} - {props.orassosire}</h1>
            <h1 className="cursa--autocar">Autocar: {props.autocar}</h1>
            <p className="cursa--status">Status: {props.status}</p>
            <p className="cursa--ziplecare">Zi plecare: {ziPlecare}</p>
            <p className="cursa--ziplecare">Ora plecare: {props.oraplecare}</p>
            <p className="cursa--ziplecare">Ora sosire: {props.orasosire}</p>
            <img src={Trash} className="trash" onClick={() => handleDeleteCursa(props.id)} />*/
            }

            <div className="cursa--row">
                <img src={Road} alt="" className="row--image" />
                <h1 className="row--text">{props.orasplecare} - {props.orassosire}</h1>
            </div>

            <div className="cursa--row">
                <img src={Bus} alt="" className="row--image" />
                <h1 className="row--text">{props.autocar}</h1>
            </div>

            <div className="cursa--row">
                <img src={Calendar} alt="" className="row--image" />
                <h1 className="row--text">{ziPlecare}</h1>
            </div>

            <div className="cursa--row">
                <img src={Clock} alt="" className="row--image" />
                <h1 className="row--text">{props.oraplecare} - {props.orasosire}</h1>
            </div>

            <div className="cursa--row">
                <img src={Status} alt="" className="row--image" />
                <h1 className="row--text">{props.status}</h1>
            </div>
            
        </div>
    )
}