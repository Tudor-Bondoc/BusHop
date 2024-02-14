import React from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Traseu from "../components/Traseu";
import Add from "../../images/add.png"

export default function Trasee(){

    const [listaTrasee, setListaTrasee] = React.useState([])

    //Mapare lista de trasee catre componenta Traseu
    const lista = listaTrasee.map((value, key) => {
    return(
      <Traseu
        id = {value.id}
        key = {value.id}
        oras_pornire = {value.oras_pornire}
        oras_1 = {value.oras_1}
        oras_2 = {value.oras_2}
        oras_3 = {value.oras_3}
        oras_sosire = {value.oras_sosire}
        /*onClick = {()=>{navigate(`/post/${value.id}`)}}*/
      />
    )
    }) 

    //Request catre API pentru lista de trasee
    React.useEffect(()=> {
        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })
    }, [])

    return(
        <div>
            {lista}
            <Link to="/adaugare_traseu">
                <img src={Add} className="add-button" />
            </Link>
        </div>
    )
}