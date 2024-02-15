import React from "react";
import Trash from "../../images/trash.png"
import axios from "axios";
import "../styles/Autocar.css"

export default function Autocar(props){

    //Handler pentru stergere traseu
    const handleDeleteAutocar = async (id) => {

        try {
            await axios.delete(`http://localhost:3002/autocare/${id}`);
            window.location.reload()
        } catch (error) {
            console.error("Eroare la ștergerea autocarului cu id-ul :", id, error);
        }
    }

    return(
        <div className="autocar--container" /*onClick={() => props.onClick()}*/>
            <div className="left--side">
                <h1 className="marca">{props.marca}</h1>
                <p className="numar--inmatriculare">{props.numar_inmatriculare}</p>
            </div>
            <div className="right--side">
                <h1 className="numar--locuri">Numar locuri: {props.numar_locuri}</h1>
            </div>
            <img src={Trash} className="trash" onClick={() => handleDeleteAutocar(props.id)} />
        </div>
    )
}