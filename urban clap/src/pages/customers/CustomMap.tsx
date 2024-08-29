import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [address, setAddress] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleMapClick = async (latlng) => {
        const address = await fetchAddress(latlng.lat, latlng.lng);
        const newMarker = { position: latlng, address };
        setMarkers([newMarker]);
        setSelectedMarker(newMarker);
        setAddress(address);
    };

    const fetchAddress = async (lat, lng) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        return data.display_name || 'No address found';
    };

    const handleMarkerRemove = (positionToRemove, event) => {
        event.stopPropagation();
        setMarkers(markers.filter(marker => marker.position !== positionToRemove));
        setSelectedMarker(null);
        setAddress('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedMarker) {
            alert('Please select a marker on the map.');
            return;
        }

        const response = await fetch('https://your-backend-api.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address || selectedMarker.address,
                lat: selectedMarker.position.lat,
                lng: selectedMarker.position.lng,
            }),
        });

        if (response.ok) {
            alert('Form submitted successfully!');
            setFormSubmitted(true);
        } else {
            alert('Failed to submit form.');
        }
    };

    function MapEvents() {
        useMapEvents({
            click(event) {
                handleMapClick(event.latlng);
            },
        });
        return null;
    }

    return (
        <div style={{ marginBottom: '4%', padding: '1rem' }}>
            <MapContainer center={[23.0225, 72.5714]} zoom={10} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEvents />
                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.position.lat, marker.position.lng]}>
                        <Popup>
                            You clicked here: <br />
                            Latitude: {marker.position.lat} <br />
                            Longitude: {marker.position.lng} <br />
                            Address: {marker.address} <br />
                            <button onClick={(event) => handleMarkerRemove(marker.position, event)}>
                                Remove Marker
                            </button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2>Submit Address</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="address">Address:</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address here..."
                        style={{ marginLeft: '0.5rem', padding: '0.5rem', width: '300px' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MapComponent;
