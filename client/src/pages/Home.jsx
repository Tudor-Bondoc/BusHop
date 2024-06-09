import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { format } from 'date-fns'
import * as Yup from 'yup'
import axios from "axios"
import Header from "../components/Header";
import Cursa from "../components/Cursa";
import "../styles/Home.css"
import CursaHome from "../components/CursaHome";
import ContactForm from "../components/ContactForm";

export default function Home() {

    const [show, setShow] = React.useState(false)
    const [listaCurse, setListaCurse] = React.useState([])
    const [listaCurseFiltrata, setListaCurseFiltrata] = React.useState([])
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])
    const [listaNumarRezervari, setListaNumarRezervari] = React.useState([])
    const [top3Curse, setTop3Curse] = React.useState([]);

    const listaOrasePornire = []
    const listaOraseSosire = []

    //Request catre API pentru lista de curse, trasee si autocare
    React.useEffect(()=> {

        axios.get("http://localhost:3002/curse/neinitiate").then((response)=> {
            setListaCurse(response.data)
        })

        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })

        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })

        getTop3Curse();

    }, [])

    const getTop3Curse = async () => {
        try {
            const curseNeinitiate = await axios.get("http://localhost:3002/curse/neinitiate");
            const rezervariPromiseArray = curseNeinitiate.data.map(async cursa => {
                const numarRezervariResponse = await axios.get(`http://localhost:3002/rezervari/numar/${cursa.id}`);
                return {
                    ...cursa,
                    numarRezervari: numarRezervariResponse.data.numarRezervari
                };
            });
    
            const curseWithRezervari = await Promise.all(rezervariPromiseArray);
            const top3 = curseWithRezervari
                .sort((a, b) => b.numarRezervari - a.numarRezervari)
                .slice(0, 3);
    
            setTop3Curse(top3);
        } catch (error) {
            console.error("Eroare la obținerea top 3 curse: ", error);
        }
    };

    function onSubmit(values) {

        const orasPlecare = values.oras_pornire.toLowerCase();
        const orasDestinatie = values.oras_sosire.toLowerCase();
        let dataPlecare = 0
        if (values.data_plecare!='')
            dataPlecare = format(new Date(values.data_plecare), 'M/d/yyyy');

        console.log(dataPlecare)

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
        oras_pornire: 'Cluj',
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

    return(
        <div className="home--container">

            <Header />

            <div className="after--header">

                <div className="cautare--curse">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>

                            <Field as="select" id="input--oras--pornire" name="oras_pornire" placeholder = "Oras pornire">
                                {listaOrasePornire.map(oras => (
                                    <option key={oras} value={oras}>
                                        {oras}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="oras_pornire" component="span" />

                            <Field as="select" id="input--oras--destinatie" name="oras_sosire" placeholder = "Oras destinatie">
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

                <div className="curse--populare--top">
                    <h1 className="curse--populare--title">CURSE POPULARE</h1>
                </div>

                <div className="curse--populare">
                {top3Curse.map((cursa, index) => (
                        <CursaHome
                            id={cursa.id}
                            key={cursa.id}
                            orasplecare={listaTrasee.find(traseu => traseu.id === cursa.TraseuID)?.oras_pornire || "Necunoscut"}
                            orassosire={listaTrasee.find(traseu => traseu.id === cursa.TraseuID)?.oras_sosire || "Necunoscut"}
                            ziplecare={cursa.zi_plecare}
                        />
                    ))}
                </div>

                <div className="home--about">
                    <div className="home--about--text--container">
                        <h2 className="home--about--title">Bine ati venit pe platforma BusHop!</h2>
                        <p>Datorita aplicatiei BusHop, calatoriile cu autocarul nu au fost nicicand mai la indemana! Inregistrati-va chiar acum pentru a putea efectua rezervari la cursele dorite.</p>
                        <p>Incepeti prin a cauta cursa dorita si a selecta locul, din cele disponibile. Odata ce efectuati rezervarea, aceasta va fi disponibila in sectiunea "Rezervari" din pagina dvs. de profil. Mai mult, veti primi si un mail de confirmare cu detaliile aferente rezervarii efectuate.</p>
                        <p>Imediat ce soferul va incepe cursa, veti putea urmari locatia autocarului pe harta, in timp real.</p>
                        <p>Plata calatoriei se efectueaza la imbarcare. Pentru a nu pierde rezervarile, va recomandam sa fiti prezenti in autogara cu cel putin 15 minute inainte de plecarea autocarului. Va multumim!</p>
                        <p>BusHop va ureaza Calatorie Placuta!</p>
                    </div>
                </div>


                {/*<div className="custom-shape-divider-bottom-1717929337">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>
                </div>*/}
                

                </div>

                <ContactForm />

                <footer className="home--footer">
                     <p>© 2024 BusHop. Toate drepturile rezervate.</p>
                     <p>Cheers <a href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">Free SVG Backgrounds and Patterns by SVGBackgrounds.com</a> for the background svg</p>
                </footer>

        </div>
    )
}