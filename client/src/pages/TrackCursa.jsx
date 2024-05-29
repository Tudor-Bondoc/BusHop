// TrackCursa.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

const socket = io('http://localhost:3002');

export default function TrackCursa() {
    const { id } = useParams();
    const [coordonate, setCoordonate] = useState(null);

    useEffect(() => {
        socket.emit('start-cursa', { id });

        socket.on('new-coordonate', (data) => {
            setCoordonate(data);
        });

        return () => {
            socket.emit('stop-cursa', { id });
            socket.off('new-coordonate');
        };
    }, [id]);

    return (
        <div>
            <h1>Urmărire cursa {id}</h1>
            {coordonate ? (
                <MapContainer center={[coordonate.latitudine, coordonate.longitudine]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[coordonate.latitudine, coordonate.longitudine]}>
                        <Popup>
                            Autocarul este aici.
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Așteptăm coordonatele...</p>
            )}
        </div>
    );
}
