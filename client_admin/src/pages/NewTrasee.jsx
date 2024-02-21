import React from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Traseu from "../components/Traseu";
import "../styles/NewTrasee.css"

export default function NewTrasee() {

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

    //Logica pentru formular

    const initialValues = {
        oras_pornire: "",
        oras_1: "",
        oras_2: "",
        oras_3: "",
        oras_sosire: ""
    }

    const validationSchema = Yup.object().shape({
        oras_pornire: Yup.string().required(),
        oras_1: Yup.string(),
        oras_2: Yup.string(),
        oras_3: Yup.string(),
        oras_sosire: Yup.string().required()
    })

    let navigate = useNavigate()

    function onSubmit(data) {
        axios.post("http://localhost:3002/trasee", data).then((response)=> {
            console.log("IT WORKED")
        })
        //navigate("/trasee")
        window.location.reload()
    }

    return(
        <div className="new--trasee--container">
            
            <div className="form--container">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>

                    <label>Oras pornire</label>
                    <ErrorMessage name="oras_pornire" component="span" />
                    <Field
                        id = "input--oras--pornire"
                        name = "oras_pornire"
                        placeholder = "Ex. Cluj..."
                    />

                    <label>Oras 1</label>
                    <ErrorMessage name="oras_1" component="span" />
                    <Field
                        id = "input--oras--1"
                        name = "oras_1"
                    />

                    <label>Oras 2</label>
                    <ErrorMessage name="oras_2" component="span" />
                    <Field
                        id = "input--oras--2"
                        name = "oras_2"
                    />

                    <label>Oras 3</label>
                    <ErrorMessage name="oras_3" component="span" />
                    <Field
                        id = "input--oras--3"
                        name = "oras_3"
                    />

                    <label>Oras sosire</label>
                    <ErrorMessage name="oras_sosire" component="span" />
                    <Field
                        id = "input--oras--sosire"
                        name = "oras_sosire"
                    />

                    <button type="submit">Adaugare traseu</button>

                </Form>
            </Formik>
            </div>

            <div className="lista--container">
                {lista}
            </div>

        </div>
    )
}