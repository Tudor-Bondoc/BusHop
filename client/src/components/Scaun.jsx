import React from "react";
import "../styles/Scaun.css"

export default function Scaun(props) {

    /*return(
        <div className={`scaun ${props.ocupat ? 'occupied' : 'liber'}`} onClick={()=>{props.onClick()}}>
            {props.numar_loc}
            {props.ocupat}
        </div>
    )*/
    return(
        <div
            className={`scaun ${props.ocupat ? 'occupied' : props.selectat ? 'selected' : 'liber'}`}
            onClick={() => {
                if (!props.ocupat) {
                    props.onClick();
                }
            }}
        >
            {props.numar_loc}
            {props.ocupat}
        </div>
    )
}