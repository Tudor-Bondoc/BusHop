import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from 'yup'
import Scaun from "../components/Scaun";
import "../styles/AddRezervare.css"

export default function AddRezervare() {

    let { id } = useParams()

    let numere = [];

    for (let i = 1; i <= 40; i++) {
        numere.push(i);
    }

    const [numarScaunSelectat, setNumarScaunSelectat] = React.useState(null)
    const [listaRezervari, setListaRezervari] = React.useState([])

    //Request API pentru lista de rezervari asociate Cursei id
    React.useEffect(()=>{
        axios.get(`http://localhost:3002/rezervari/${id}`).then((response)=> {
            setListaRezervari(response.data)
        })
    }, [])

    let ocupate = []

    if (listaRezervari) {
        for (let i = 0; i < listaRezervari.length; i++) {
            ocupate.push(listaRezervari[i].loc)
        }
    }
    
    function handleClick(numar) {
        if (!ocupate.includes(numar))
            setNumarScaunSelectat(numar)
    }


    const listaScaune = numere.map((numar, key) => {
        return (
            <Scaun
                key = {numar}
                numar_loc = {numar}
                onClick = {()=>{handleClick(numar)}}
                ocupat = {ocupate.includes(numar)}
            />
        )
    })

    let navigate = useNavigate()

    //Functie pentru submit form
    function onSubmit() {

        const dataActualizata = {loc: numarScaunSelectat, CursaID: id}

        axios.post(`http://localhost:3002/rezervari/${id}`, dataActualizata, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((response)=> {
            if (response.data.error) {
                alert(response.data.error)
            }
            else    
                console.log("IT WORKED")
        })

        navigate(`/`)
    }

    return(
        <div className="add--rezervare--container">

        <div className="form--container--default2 form--modified">
            
                <div className="form--rez">
                    <p className="loc--selectat">Loc selectat: {numarScaunSelectat}</p>
                    <button type="submit" className="rez--button" onClick={onSubmit}>Adaugare rezervare</button>
                </div>

        </div>

        <div className="lista--scaune--container">
            {listaScaune}
        </div>

        </div>
    )
}