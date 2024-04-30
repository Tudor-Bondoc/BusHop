//Utils
import React from "react";
//Pictures
import Road from "../../images/road2.png"
import Bus from "../../images/busicon2.png"
import Calendar from "../../images/calendar2.png"
import Clock from "../../images/clock2.png"
import Status from "../../images/status.png"
//Style
import "../styles/Cursa.css"

export default function Cursa(props) {

    const ziPlecare = new Date(props.ziplecare).toLocaleDateString();

    return(
        <div className="cursa--container">

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