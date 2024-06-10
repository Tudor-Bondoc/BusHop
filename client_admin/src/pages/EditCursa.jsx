import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

export default function EditCursa() {
    const { id } = useParams();
    const [cursaData, setCursaData] = useState(null);
    const [listaTrasee, setListaTrasee] = useState([]);
    const [listaSoferi, setListaSoferi] = useState([])
    const [listaAutocare, setListaAutocare] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cursa data
        axios.get(`http://localhost:3002/curse/${id}`)
            .then(response => {
                setCursaData(response.data);
            })
            .catch(error => {
                console.error("Eroare la aducerea datelor cursei:", error);
            });

        // Fetch trasee data
        axios.get("http://localhost:3002/trasee")
            .then(response => {
                setListaTrasee(response.data);
            })
            .catch(error => {
                console.error("Eroare la aducerea datelor traseelor:", error);
            });

        // Fetch autocare data
        axios.get("http://localhost:3002/autocare")
            .then(response => {
                setListaAutocare(response.data);
            })
            .catch(error => {
                console.error("Eroare la aducerea datelor autocarelor:", error);
            });

        // Fetch soferi data
        axios.get("http://localhost:3002/soferi")
            .then(response => {
                setListaSoferi(response.data);
            })
            .catch(error => {
                console.error("Eroare la aducerea datelor soferilor:", error);
            });
    }, [id]);

    // Schema de validare Yup
    const validationSchema = Yup.object().shape({
        zi_plecare: Yup.date().required("Ziua plecării este obligatorie."),
        ora_plecare: Yup.string().required("Ora plecării este obligatorie."),
        ora_sosire: Yup.string().required("Ora sosirii este obligatorie."),
        TraseuID: Yup.number().required("Traseul este obligatoriu."),
        AutocarID: Yup.number().required("Autocarul este obligatoriu."),
        SoferID: Yup.number().required("Soferul este obligatoriu.")
    });

    // Funcție pentru trimiterea datelor către server la submiterea formularului
    const handleSubmit = async (values) => {
        try {
            await axios.put(`http://localhost:3002/curse/${id}`, values);
            navigate("/curse");
        } catch (error) {
            console.error("Eroare la actualizarea cursei:", error);
        }
    };

    return (
        <div className="form--container--default">
            <h1 className="form--title">Editeaza Cursa</h1>
            {cursaData && (
                <Formik
                    initialValues={{
                        zi_plecare: cursaData.zi_plecare,
                        ora_plecare: cursaData.ora_plecare,
                        ora_sosire: cursaData.ora_sosire,
                        TraseuID: cursaData.TraseuID,
                        AutocarID: cursaData.AutocarID,
                        SoferID: cursaData.SoferID
                    }}
                    validationSchema={validationSchema}
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

                        <label htmlFor="SoferID">Sofer</label>
                        <Field as="select" id="SoferID" name="SoferID">
                            {listaSoferi.map(sofer => (
                                <option key={sofer.id} value={sofer.id}>
                                    {sofer.nume}
                                </option>
                            ))}
                        </Field>

                        <button type="submit">Actualizează Cursa</button>
                    </Form>
                </Formik>
            )}
        </div>
    );
}
