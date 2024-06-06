import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Scaun from "../components/Scaun";
import Header from "../components/Header";
import { AuthContext } from '../helpers/AuthContext'
import "../styles/AddRezervare.css"

export default function AddRezervare() {


    const {authState} = React.useContext(AuthContext)

    let { id } = useParams()

    let numere = [];

    for (let i = 1; i <= 40; i++) {
        numere.push(i);
    }

    const [numarScaunSelectat, setNumarScaunSelectat] = React.useState(null)
    const [listaRezervari, setListaRezervari] = React.useState([])
    const [cursa, setCursa] = React.useState({})
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])


    //Request API pentru lista de rezervari asociate Cursei id
    React.useEffect(()=>{

        axios.get(`http://localhost:3002/rezervari/${id}`).then((response)=> {
            setListaRezervari(response.data)
        })

        axios.get(`http://localhost:3002/curse/${id}`).then((response)=>{
            setCursa(response.data)
        })

        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })

        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })

    }, [])

    const traseuSelectat = listaTrasee.find(traseu => traseu.id === cursa.TraseuID)
    const autocarSelectat = listaAutocare.find(autocar => autocar.id === cursa.AutocarID)
    const ziPlecare = new Date(cursa.zi_plecare).toLocaleDateString();
    
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
                selectat = {numarScaunSelectat === numar}
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

        <>

        <Header />

        <div className="add--rezervare--container">

        <div className="form--container--default2 form--modified">
            
                <div className="form--rez">
                    <p className="loc--selectat">Traseu: {traseuSelectat ? `${traseuSelectat.oras_pornire} - ${traseuSelectat.oras_sosire}` : 'Loading...'}</p>
                    <p className="loc--selectat">Autocar: {autocarSelectat ? autocarSelectat.numar_inmatriculare : 'Loading...'}</p>
                    <p className="loc--selectat">Zi plecare: {ziPlecare}</p>
                    <p className="loc--selectat">Ora plecare: {cursa.ora_plecare}</p>
                    <p className="loc--selectat">Ora sosire: {cursa.ora_sosire}</p>
                    <p className="loc--selectat">Nume pasager: {authState.nume}</p>
                    <p className="loc--selectat">Loc selectat: {numarScaunSelectat}</p>
                    <button type="submit" className="rez--button" onClick={onSubmit}>Adaugare rezervare</button>
                </div>

        </div>


        <div className="lista--scaune--container">
            {listaScaune}
        </div>

        </div>

        </>
    )
}