import React from "react";
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Link } from "react-router-dom"
import axios from "axios";
import "../styles/Register.css"

export default function Register() {
    const initialValues = {
        nume: "",
        email: "",
        parola: "",
    }

    const validationSchema = Yup.object().shape({
        nume: Yup.string().required(),
        /*email: Yup.string().email('Adresa invalida').required(),*/
        email: Yup.string()
            .email('Adresa invalida')
            .matches(/^[a-zA-Z0-9._%+-]+@bushop\.com$/, 'Emailul trebuie să fie pe domeniul @bushop.com')
            .required(),
        parola: Yup.string().min(4).max(50).required(),
    })

    function onSubmit(data) {
        axios.post("http://localhost:3002/soferi", data).then(()=>{
            console.log("sofer added")
        })
    }

    return(
        <div className="login--page--container login--page--container2">
            <div className="login--header">
                <h1 className="login--header--title">BusHop Driver</h1>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="login--form">
                    <Link to="/home" className="link--form">Home</Link>
                    
                    <label className="login--label">Nume: </label>
                    <ErrorMessage name="nume" component="span" className="login--error" />
                    <Field
                        id="input--nume"
                        name="nume"
                        autoComplete="off"
                        className="login--input"
                    />

                    <label className="login--label">Email: </label>
                    <ErrorMessage name="email" component="span" className="login--error" />
                    <Field
                        id="input--email"
                        name="email"
                        autoComplete="off"
                        className="login--input"
                    />

                    <label className="login--label">Parola: </label>
                    <ErrorMessage name="parola" component="span" className="login--error" />
                    <Field
                        id="input--parola"
                        name="parola"
                        type="password"
                        autoComplete="off"
                        className="login--input"
                    />

                    <p className="already--registered">Aveti deja cont?</p>
                    <Link to="/" className="link--form">Login</Link>

                    <button type="submit" className="buton--signup">Inregistrare</button>
                </Form>
            </Formik>
        </div>
    )
}