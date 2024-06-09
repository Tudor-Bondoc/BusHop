import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import "../styles/ContactForm.css"

export default function ContactForm() {

    const initialValues = {
        nume: "",
        email: "",
        text: ""
    }

    const validationSchema = Yup.object().shape({
        nume: Yup.string().required(),
        email: Yup.string().required(),
        text: Yup.string().required()
    })

    const submitContactForm = async (data) => {
        await axios.post("http://localhost:3002/pasageri/contact", data)
    }

    return(

        <div className="blue--wrapper">
        <div className="contact--form--container">
        <p className="contact--form--info">Aveti vreo sugestie sau nemultumire? Contactati-ne!</p>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitContactForm}
        >
            <Form className="contact--form"> 
                <label className="contact--form--label">Nume</label>
                <ErrorMessage name="nume" component="span" className="contact--form--error" />
                <Field
                    id="input--nume"
                    name="nume"
                    className="contact--form--input"
                ></Field>

                <label className="contact--form--label">Email</label>
                <ErrorMessage name="email" component="span" className="contact--form--error" />
                <Field
                    id="input--email"
                    name="email"
                    className="contact--form--input"
                ></Field>

                <label className="contact--form--label">Text</label>
                <ErrorMessage name="text" component="span" className="contact--form--error" />
                <Field
                    id="input--text"
                    name="text"
                    className="contact--form--input"
                ></Field>

                <button type="submit" className="contact--form--button">Trimite</button> 
            </Form>
        </Formik>

        {/*<div className="custom-shape-divider-top-1717949562">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
            </svg>
        </div>*/}

        </div>
        </div>
    )
}