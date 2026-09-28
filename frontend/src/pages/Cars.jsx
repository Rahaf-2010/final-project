import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";

function Cars() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minYear, setMinYear] = useState("");
    const [maxYear, setMaxYear] = useState("");
    const [maxMileage, setMaxMileage] = useState("");

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

    const filteredCars = cars.filter((car) => {
        const searchtext = search.toLowerCase().trim();

        const matchesSearch = car.brandModel.toLowerCase().includes(searchtext);

        const matchesType = vehicleType === "" || car.vehicleType.toLowerCase() === vehicleType.toLowerCase();

        const matchesMinPrice = minPrice === "" || car.price >= Number(minPrice);

        const matchesMaxPrice = maxPrice === "" || car.price <= Number(maxPrice);

        const matchesMinYear = minYear === "" || car.year >= Number(minYear);

        const matchesMaxYear = maxYear === "" || car.year <= Number(maxYear);

        const matchesMaxMileage = maxMileage === "" || car.mileage <= Number(maxMileage);

        return (
                matchesSearch && 
                matchesType && 
                matchesMinPrice &&
                matchesMaxPrice && 
                matchesMinYear && 
                matchesMaxYear && 
                matchesMaxMileage
        );      
    });


    return (
        <div>
            <h1>Autos kaufen</h1>
            <div>
                <input
                    type="text"
                    placeholder="Suche nach Marke oder Modell"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>

                    <option value="">Alle Fahrzeugtypen</option>
                    <option value="PKW">PKW</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                    <option value="Cabrio">Cabrio</option>
                    <option value="Kombi">Kombi</option>
                    <option value="Transporter">Transporter</option>
                </select>

                <input
                    type="number"
                    placeholder="MindestPreis"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Höchstpreis"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Ab Baujahr"
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Bis Baujahr"
                    value={maxYear}
                    onChange={(e) => setMaxYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Maximale Kilometerzahl"
                    value={maxMileage}
                    onChange={(e) => setMaxMileage(e.target.value)}
                />
            </div>
            {message && <p>{message}</p>}
            {filteredCars.length === 0 ? (
                <p>Derzeit sind keine Fahrzeuge verfügbar</p>
            ) : (
                <div>
                    {filteredCars.map((car) => (
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

                            <button onClick={() => navigate(`/cars/${car._id}`)}>Details ansehen</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cars;