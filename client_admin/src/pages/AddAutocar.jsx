import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import axios from "axios"

export default function AddAutocar() {

    const initialValues = {
        numar_inmatriculare: "",
        numar_locuri: "",
        marca: ""
    }

    const validationSchema = Yup.object().shape({
        numar_inmatriculare: Yup.string().required(),
        numar_locuri: Yup.string().required(),
        marca: Yup.string().required()
    })

    let navigate = useNavigate()

    const onSubmitAutocar = async(data) => {
    
        try {
            await axios.post("http://localhost:3002/autocare", data)
            navigate("/autocare")
        } catch(error){
            console.error("Eroare la adaugarea autocarului: ", error);
        }
    }

    return (
        <div className="form--container">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmitAutocar}
                validationSchema={validationSchema}
            >
                <Form>

                    <label>Numar inmatriculare: </label>
                    <ErrorMessage name="numar_inmatriculare" component="span" />
                    <Field
                        id = "input--numar--inmatriculare"
                        name = "numar_inmatriculare"
                        placeholder = "Ex: CJ 20 BUS"
                    />

                    <label>Numar locuri: </label>
                    <ErrorMessage name="numar_locuri" component="span" />
                    <Field
                        id = "input--numar--locuri"
                        name = "numar_locuri"
                    />

                    <label>Marca: </label>
                    <ErrorMessage name="marca" component="span" />
                    <Field
                        id = "input--marca"
                        name = "marca"
                    />

                    <button type="submit">Adaugare autocar</button>

                </Form>
            </Formik>
        </div>
    )
}