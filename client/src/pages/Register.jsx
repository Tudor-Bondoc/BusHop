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
        telefon: ""
    }

    const validationSchema = Yup.object().shape({
        nume: Yup.string().required(),
        email: Yup.string().email('Adresa invalida').required(),
        parola: Yup.string().min(4).max(50).required(),
        telefon: Yup.string().matches(/^\d{10}$/, 'Numărul de telefon trebuie să conțină exact 10 cifre').required()
    })

    function onSubmit(data) {
        axios.post("http://localhost:3002/pasageri", data).then(()=>{
            console.log("user added")
        })
    }

    return(
        <div className="login--page--container">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>

                    <Link to="/" className="link--form">Home</Link>
                    
                    <label>Nume: </label>
                    <ErrorMessage name="nume" component="span" />
                    <Field
                        id = "input--nume"
                        name = "nume"
                        autoComplete = "off"
                    />

                    <label>Email: </label>
                    <ErrorMessage name="email" component="span" />
                    <Field
                        id = "input--email"
                        name = "email"
                        autoComplete = "off"
                    />

                    <label>Parola: </label>
                    <ErrorMessage name="parola" component="span" />
                    <Field
                        id = "input--parola"
                        name = "parola"
                        type = "password"
                        autoComplete = "off"
                    />

                    <label>Telefon: </label>
                    <ErrorMessage name="telefon" component="span" />
                    <Field
                        id = "input--telefon"
                        name = "telefon"
                        autoComplete = "off"
                    />

                    <p className="already--registered">Aveti deja cont? </p>
                    <Link to="/login" className="link--form">Login</Link>

                    <button type="submit" className="buton--signup">Inregistrare</button>

                </Form>
            </Formik>
        </div>
    )
}