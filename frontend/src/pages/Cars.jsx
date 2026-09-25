import {useState, useEffect} from 'react';
import api from "../services/api";

function Cars() {
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/cars");
                setCars(response.data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Fahrzeuge:', error);
                setMessage(error.response?.data?.message || "Fehler beim Abrufen der Fahrzeuge");
            }
        };
        fetchCars();
    }, []);

    return (
        <div>
            <h1>Autos kaufen</h1>
            {message && <p>{message}</p>}
            {cars.length === 0 ? (
                <p>Derzeit sind keine Fahrzeuge verfügbar</p>
            ) : (
                <div>
                    {cars.map((car) => (
                        <div key={car._id}>
                            <h2>{car.brandModel}</h2>
                            {car.images && car.images.length > 0 && (
                                <div>
                                    {car.images.map((image, index) => (
                                        <img 
                                            key={index}
                                            src={`http://localhost:5000${image}`}
                                            alt={`${car.brandModel} ${index + 1}`} 
                                            style={{width: '200px', height: 'auto'}} />
                                    ))}
                                </div>
                            )}
                            <p>Fahrzeugtyp: {car.vehicleType}</p>
                            <p>Baujahr: {car.year}</p>
                            <p>Kilometerstand: {car.mileage} km</p>
                            <p>Preis: {car.price} €</p>

                            {car.description && (<p>Beschreibung: {car.description}</p>)}

                            <button>Details ansehen</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cars;