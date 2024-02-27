import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import Header from "../components/Header";
import "../styles/Home.css"

export default function Home() {

    const [show, setShow] = React.useState(false)

    function onSubmit(data) {
        setShow(true)
    }

    const validationSchema = Yup.object().shape({
        oras_pornire: Yup.string().required('!'),
        oras_destinatie: Yup.string().required('!'),
        data_plecare: Yup.date().required('!'),
    })

    const initialValues = {
        oras_pornire: '',
        oras_destinatie: '',
        data_plecare: ''
    }

    return(
        <div className="home--container">
            <Header />
            <div className="cautare--curse">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>

                        <Field
                            id = "input--oras--pornire"
                            name = "oras_pornire"
                            placeholder = "Oras pornire"
                            autoComplete = "off"
                        />
                        <ErrorMessage name="oras_pornire" component="span" />
                        
                        <Field
                            id = "input--oras--destinatie"
                            name = "oras_destinatie"
                            placeholder = "Oras destinatie"
                            autoComplete = "off"
                        />
                        <ErrorMessage name="oras_destinatie" component="span" />

                        <Field
                            type = "date"
                            name = "data_plecare"
                            placeholder = "Data plecare"
                        />
                        <ErrorMessage name="data_plecare" component="span" />

                        <button type="submit">Cauta curse</button>

                    </Form>

                </Formik>
            </div>

            {show && <p>Voilla</p>}

        </div>
    )
}