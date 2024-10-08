//Utils
import React from "react";
import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import axios from 'axios'
import { AuthContext2 } from '../helpers/AuthContext';
//Components
import Cursa from "../components/Cursa"
//Styles
import "../styles/Home.css"

export default function Home() {

    const { authState2, setAuthState2 } = React.useContext(AuthContext2);

    const [listaCurse, setListaCurse] = React.useState([])
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])
    const [listaCurseFiltrata, setListaCurseFiltrata] = React.useState([])

    const [show, setShow] = React.useState(false)

    const listaOrasePornire = []
    const listaOraseSosire = []

    let navigate = useNavigate()

    //Request catre API pentru lista de curse, trasee si autocare
    React.useEffect(()=> {

        axios.get(`http://localhost:3002/curse/bydriver/${authState2.id}`).then((response)=> {
            setListaCurse(response.data)
        })

        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })

        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })

    }, [])

    function onSubmit(values) {

        const orasPlecare = values.oras_pornire.toLowerCase();
        const orasDestinatie = values.oras_sosire.toLowerCase();
        let dataPlecare = 0
        if (values.data_plecare!='')
            dataPlecare = format(new Date(values.data_plecare), 'M/d/yyyy')

        const listaFiltrata = listaCurse.filter(cursa => {

            const traseuCursa = listaTrasee.find(traseu => traseu.id === cursa.TraseuID);
            if (!traseuCursa) {
                return false; // Dacă nu există traseu pentru cursă, o excludem
            }
            const dataPlecareCursa = format(new Date(cursa.zi_plecare), 'M/d/yyyy');

            if (dataPlecare!=0) {
                return traseuCursa.oras_pornire.toLowerCase() === orasPlecare &&
                    traseuCursa.oras_sosire.toLowerCase() === orasDestinatie &&
                    dataPlecare === dataPlecareCursa;
            }
            return traseuCursa.oras_pornire.toLowerCase() === orasPlecare &&
                   traseuCursa.oras_sosire.toLowerCase() === orasDestinatie
        })

        setListaCurseFiltrata(listaFiltrata)
        setShow(true)

    }

    const lista = listaCurseFiltrata.map( (value, key) => {

        const traseuSelectat = listaTrasee.find(traseu => traseu.id === value.TraseuID)
        if (!traseuSelectat) {
            return <p key={key}>Traseul nu a fost găsit încă.</p>;
        }

        const autocarSelectat = listaAutocare.find(autocar => autocar.id === value.AutocarID)
        if (!autocarSelectat) {
            return <p key={key}>Autocarul nu a fost găsit încă.</p>;
        }

        return(
            <Cursa
                id = {value.id}
                key = {value.id}
                ziplecare = {value.zi_plecare}
                oraplecare = {value.ora_plecare}
                orasosire = {value.ora_sosire}
                orasplecare = {traseuSelectat.oras_pornire}
                orassosire = {traseuSelectat.oras_sosire}
                autocar = {autocarSelectat.numar_inmatriculare}
                status = {value.status} 
            />
        )
    })

    const validationSchema = Yup.object().shape({
        oras_pornire: Yup.string().required('!'),
        oras_sosire: Yup.string().required('!'),
        data_plecare: Yup.date()
    })

    const initialValues = {
        oras_pornire: 'Ramnicu Valcea',
        oras_sosire: 'Bucuresti',
        data_plecare: ''
    }

    for (const traseu of listaTrasee) {
        if (!listaOrasePornire.includes(traseu.oras_pornire)) {
            listaOrasePornire.push(traseu.oras_pornire)
        }
        if (!listaOraseSosire.includes(traseu.oras_sosire)) {
            listaOraseSosire.push(traseu.oras_sosire)
        }
    }

    const logout = () => {
        sessionStorage.removeItem("accessToken")
        setAuthState2({
            nume: "",
            id: 0,
            email: "",
            status: false
        })
        navigate("/")
    }

    return(
        <div className="home--driver--container">
            <h1 className="home--salut">Salut, {authState2.nume}!</h1>
            <button onClick={logout} className="buton--logout">Logout</button>
            <div className="cautare--curse">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="cautare--curse--form">

                        <Field className="form--select" as="select" id="input--oras--pornire" name="oras_pornire" placeholder = "Oras pornire">
                            {listaOrasePornire.map(oras => (
                                <option key={oras} value={oras}>
                                    {oras}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="oras_pornire" component="span" />

                        <Field className="form--select" as="select" id="input--oras--destinatie" name="oras_sosire" placeholder = "Oras destinatie">
                            {listaOraseSosire.map(oras => (
                                <option key={oras} value={oras}>
                                    {oras}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="oras_sosire" component="span" />

                        <Field
                            type = "date"
                            name = "data_plecare"
                            placeholder = "Data plecare"
                            className = "form--select"
                        />
                        <ErrorMessage name="data_plecare" component="span" />
                    
                        <button type="submit" className="home--button">Cauta curse</button>

                    </Form>

                </Formik>
            </div>

            {show && <div className="curse--container">
                        {lista && lista.length > 0 ? (
                            lista
                        ) : (
                            <h1 className="curse--negasite">Nu au fost gasite curse</h1>
                        )}
                     </div>
            }

        </div>
    )
}