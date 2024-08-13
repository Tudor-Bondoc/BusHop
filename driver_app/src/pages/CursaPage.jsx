import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
//Components
import Cursa from '../components/Cursa';
//Style
import '../styles/CursaPage.css';

const socket = io('http://localhost:3002');

export default function CursaPage() {

    const { id } = useParams();
    const [cursaDetails, setCursaDetails] = React.useState({});
    const [listaTrasee, setListaTrasee] = React.useState([]);
    const [listaAutocare, setListaAutocare] = React.useState([]);
    const [isStopped, setIsStopped] = React.useState(false)

    React.useEffect(() => {

        axios.get(`http://localhost:3002/curse/${id}`).then((response) => {
            setCursaDetails(response.data);
        });
        axios.get('http://localhost:3002/trasee').then((response) => {
            setListaTrasee(response.data);
        });
        axios.get('http://localhost:3002/autocare').then((response) => {
            setListaAutocare(response.data);
        });
    }, [id]);

    const traseuSelectat = listaTrasee.find((traseu) => traseu.id === cursaDetails.TraseuID);
    if (!traseuSelectat) {
        return <p>Traseul nu a fost găsit încă.</p>;
    }

    const autocarSelectat = listaAutocare.find((autocar) => autocar.id === cursaDetails.AutocarID);
    if (!autocarSelectat) {
        return <p>Autocarul nu a fost găsit încă.</p>;
    }

    async function updateCursaDetails(newCursaDetails) {
        try {
            await axios.put(`http://localhost:3002/curse/${id}`, newCursaDetails);
            setCursaDetails(newCursaDetails);
        } catch (error) {
            console.error('Eroare la actualizarea cursei:', error);
        }
    }

    let positionInterval;
    let isCursaActive = false;

    async function startCursa() {

        let newCursaDetails = { ...cursaDetails, status: 'in desfasurare' };
        await updateCursaDetails(newCursaDetails);
        socket.emit('start-cursa', { id });
    
        isCursaActive = true;
    
        positionInterval = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const timp = new Date().toISOString();
                if (!isStopped) {
                    socket.emit('update-coordonate', { id, latitudine: latitude, longitudine: longitude, timp });
                    console.log('Soferul a trimis locatia la timpul ', timp)
                }
            },
            (error) => {
                console.error('Eroare la obținerea poziției:', error);
                isCursaActive = false;
                navigator.geolocation.clearWatch(positionInterval)
            },
            { timeout: 15000 } 
        );
    }

    async function stopCursa() {

        let newCursaDetails = { ...cursaDetails, status: 'finalizata' };
        await updateCursaDetails(newCursaDetails);
        setIsStopped(true)
        socket.emit('stop-cursa', { id });
        isCursaActive = false;
        navigator.geolocation.clearWatch(positionInterval)
    }

    console.log('Status cursa:', JSON.stringify(cursaDetails.status));

    return (
        <div className='cursapage--container'>
            <Cursa
                id={cursaDetails.id}
                orasplecare={traseuSelectat.oras_pornire}
                orassosire={traseuSelectat.oras_sosire}
                autocar={autocarSelectat.numar_inmatriculare}
                ziplecare={cursaDetails.zi_plecare}
                oraplecare={cursaDetails.ora_plecare}
                orasosire={cursaDetails.ora_sosire}
                status={cursaDetails.status}
            />
            {cursaDetails.status.trim() === 'neinitiata' && (
                <button onClick={startCursa} className='buton--start'>
                    Start cursa
                </button>
            )}

            {cursaDetails.status.trim() === 'in desfasurare' && (
                <button onClick={stopCursa} className='buton--start'>
                    Finalizare cursa
                </button>
            )}
        </div>
    );
}
