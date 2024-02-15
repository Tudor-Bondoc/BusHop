import React from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Autocar from "../components/Autocar";
import Add from "../../images/add.png"

export default function Autocare(){

    const [listaAutocare, setListaAutocare] = React.useState([])

    //Mapare lista de autocare catre componenta Autocar
    const lista = listaAutocare.map((value, key) => {
    return(
      <Autocar
        id = {value.id}
        key = {value.id}
        numar_inmatriculare = {value.numar_inmatriculare}
        numar_locuri = {value.numar_locuri}
        marca = {value.marca}
        /*onClick = {()=>{navigate(`/post/${value.id}`)}}*/
      />
    )
    }) 

    //Request catre API pentru lista de autocare
    React.useEffect(()=> {
        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })
    }, [])

    return(
        <div>
            {lista}
            <Link to="/adaugare_autocar">
                <img src={Add} className="add-button" />
            </Link>
        </div>
    )
}