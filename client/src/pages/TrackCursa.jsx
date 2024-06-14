// TrackCursa.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import Header from "../components/Header.jsx"
import "../styles/TrackCursa.css"
import BusIcon from "../../images/bus.png"

const socket = io('http://localhost:3002');

export default function TrackCursa() {
    const { id } = useParams();
    const [coordonate, setCoordonate] = useState(null);
    const [statusCursa, setStatusCursa] = useState('in desfasurare');

    useEffect(() => {
        socket.emit('join-cursa', { id });

        socket.on('new-coordonate', (data) => {
            setCoordonate(data);
        });

        socket.on('cursa-started', () => {
            setStatusCursa('in desfasurare');
        });

        socket.on('cursa-stopped', () => {
            setStatusCursa('finalizata');
        });

        return () => {
            socket.off('new-coordonate');
            socket.off('cursa-started');
            socket.off('cursa-stopped');
        };
    }, [id]);

    const busIcon = new L.Icon({
        iconUrl: BusIcon,
        iconSize: [60, 36], // Mărimea imaginii
        iconAnchor: [25, 50], // Punctul de ancorare al imaginii
        popupAnchor: [0, -50], // Punctul de ancorare al popup-ului
    });

    return (
        <>
        <Header />
        <div className='container'>
            <h1 className='title'>Urmarire cursa</h1>
            {statusCursa === 'neinitiata' && <p className='status'>Cursa nu a inceput inca.</p>}
            {statusCursa === 'finalizata' && <p className='status'>Cursa s-a incheiat.</p>}
            {statusCursa === 'in desfasurare' && coordonate && (
                <MapContainer center={[coordonate.latitudine, coordonate.longitudine]} zoom={13} className='map'>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[coordonate.latitudine, coordonate.longitudine]} icon={busIcon}>
                        <Popup>
                            Autocarul este aici.
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
            {statusCursa === 'in desfasurare' && !coordonate && <p className='status'>Așteptăm coordonatele...</p>}
        </div>
        </>
    );
}
