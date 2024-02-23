import React from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Scaun from "../components/Scaun";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from 'yup'


export default function AddRezervare() {

    let { id } = useParams()

    let numere = [];

    for (let i = 1; i <= 40; i++) {
        numere.push(i);
    }

    const [numarScaunSelectat, setNumarScaunSelectat] = React.useState(null)

    function handleClick(numar) {
        setNumarScaunSelectat(numar)
    }


    const listaScaune = numere.map((numar, key) => {
        return (
            <Scaun
                key = {numar}
                numar_loc = {numar}
                onClick = {()=>{handleClick(numar)}}
            />
        )
    })
    
    const initialValues = {
        nume: ""
    }

    const validationSchema = Yup.object().shape({
        nume: Yup.string().required(),
    })

    let navigate = useNavigate()

    function onSubmit(data) {

        const dataActualizata = {...data, loc: numarScaunSelectat, CursaID: id}

        axios.post(`http://localhost:3002/rezervari/${id}`, dataActualizata).then((response)=> {
            console.log("IT WORKED")
        })

        navigate(`/curse/${id}`)
    }



    return(
        <div className="add--rezervare--container">

        <div className="form--container--default">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <label>Nume pasager</label>
                    <Field
                        id = "input--nume"
                        name = "nume"
                    />
                    <button type="submit">Adaugare traseu</button>
                </Form>
            </Formik>
        </div>

            <div className="lista--scaune--container">
                {listaScaune}
            </div>

        </div>
    )
}