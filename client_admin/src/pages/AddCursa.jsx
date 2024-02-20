import React from "react";
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'

export default function AddCursa() {

    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])

    //Request catre API pentru lista de trasee si autocare
    React.useEffect(()=> {
        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })
        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })
    }, [])

    let navigate = useNavigate()

    const handleSubmit = async(data) => {

        const dataActualizata = { ...data, status: "neinitiata "}

        try {
            await axios.post("http://localhost:3002/curse", dataActualizata)
            navigate("/curse")
        } catch(error){
            console.error("Eroare la adaugarea cursei: ", error);
        }

        /*axios.post("http://localhost:3002/curse", dataActualizata).then((response)=> {
            console.log("IT WORKED")
        })*/
    }

    return (
        <div className="form--container">
            <Formik
                initialValues={{
                    zi_plecare: "",
                    ora_plecare: "",
                    ora_sosire: "",
                    TraseuID: 1,
                    AutocarID: 1 
                  }}
                  onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="zi_plecare">Zi plecare</label>
                    <Field type="date" id="zi_plecare" name="zi_plecare" />

                    <label htmlFor="ora_plecare">Ora plecare</label>
                    <Field type="time" id="ora_plecare" name="ora_plecare" />

                    <label htmlFor="ora_sosire">Ora sosire</label>
                    <Field type="time" id="ora_sosire" name="ora_sosire" />

                    <label htmlFor="TraseuID">Traseu</label>
                    <Field as="select" id="TraseuID" name="TraseuID">
                    {listaTrasee.map(traseu => (
                        <option key={traseu.id} value={traseu.id}>
                            {traseu.oras_pornire} - {traseu.oras_sosire}
                        </option>
                    ))}
                    </Field>

                    <label htmlFor="AutocarID">Autocar</label>
                    <Field as="select" id="AutocarID" name="AutocarID">
                    {listaAutocare.map(autocar => (
                        <option key={autocar.id} value={autocar.id}>
                            {autocar.numar_inmatriculare}
                        </option>
                    ))}
                    </Field>

                    <button type="submit">
                        Adauga Cursa
                    </button>
            </Form>
            </Formik>
        </div>
    )
}