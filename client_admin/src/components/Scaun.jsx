import React from "react";
import "../styles/Scaun.css"

export default function Scaun(props) {

    return(
        <div className="scaun" onClick={()=>{props.onClick()}}>
            {props.numar_loc}
        </div>
    )
}