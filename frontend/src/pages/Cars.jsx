import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X, Gauge, CalendarDays, CarFront } from "lucide-react";
import api from "../services/api";
import "./Cars.css";

function Cars() {
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [minYear, setMinYear] = useState("");
    const [maxYear, setMaxYear] = useState("");
    const [maxMileage, setMaxMileage] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get("/cars");
                setCars(response.data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Fahrzeuge:", error);
                setMessage(
                    error.response?.data?.message ||
                    "Die Fahrzeuge konnten nicht geladen werden."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const formatPrice = (price) =>
        new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(price);

    const filteredCars = cars.filter((car) => {
        const searchText = search.toLowerCase().trim();
        const brandModel = (car.brandModel || "").toLowerCase();
        const type = (car.vehicleType || "").toLowerCase();

        return (
            brandModel.includes(searchText) &&
            (!vehicleType || type === vehicleType.toLowerCase()) &&
            Number(car.price) >= minPrice &&
            Number(car.price) <= maxPrice &&
            (!minYear || Number(car.year) >= Number(minYear)) &&
            (!maxYear || Number(car.year) <= Number(maxYear)) &&
            (!maxMileage || Number(car.mileage) <= Number(maxMileage))
        );
    });

    const resetFilters = () => {
        setSearch("");
        setVehicleType("");
        setMinPrice(0);
        setMaxPrice(100000);
        setMinYear("");
        setMaxYear("");
        setMaxMileage("");
    };

    return (
        <main className="cars-page">
            <section className="cars-heading">
                <span className="cars-eyebrow">ISSA AUTOMOBILE</span>
                <h1>Finden Sie Ihr nächstes Fahrzeug.</h1>
                <p>
                    Entdecken Sie unsere Fahrzeuge und finden Sie das
                    passende Auto für Ihre Wünsche.
                </p>
            </section>

            <section className="cars-search-panel">
                <div className="cars-panel-heading">
                    <div>
                        <SlidersHorizontal size={20} />
                        <h2>Fahrzeuge filtern</h2>
                    </div>

                    <button
                        type="button"
                        className="cars-reset-button"
                        onClick={resetFilters}
                    >
                        <X size={15} />
                        Filter zurücksetzen
                    </button>
                </div>

                <div className="cars-filter-grid">
                    <label className="cars-field cars-search-field">
                        <span>Marke oder Modell</span>
                        <div className="cars-input-with-icon">
                            <Search size={18} />
                            <input
                                type="search"
                                placeholder="z. B. BMW, Mercedes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </label>


                    <label className="cars-field">
                        <span>Fahrzeugtyp</span>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="">Alle Fahrzeugtypen</option>
                            <option value="PKW">Coupe</option>
                            <option value="SUV">SUV</option>
                            <option value="Van">Van</option>
                            <option value="Cabrio">Cabrio</option>
                            <option value="Kombi">Kombi</option>
                            <option value="Transporter">Transporter</option>
                            <option value="Limousine">Limousine</option>
                            <option value="Pick-up">Pick-up</option>
                            
                        </select>
                    </label>

                    <label className="cars-field">
                        <span>Erstzulassung ab</span>
                        <input
                            type="number"
                            placeholder="z. B. 2019"
                            value={minYear}
                            onChange={(e) => setMinYear(e.target.value)}
                        />
                    </label>

                    <label className="cars-field">
                        <span>Erstzulassung bis</span>
                        <input
                            type="number"
                            placeholder="z. B. 2026"
                            value={maxYear}
                            onChange={(e) => setMaxYear(e.target.value)}
                        />
                    </label>

                    <label className="cars-field">
                        <span>Kilometer bis</span>
                        <select
                            value={maxMileage}
                            onChange={(e) => setMaxMileage(e.target.value)}
                        >
                            <option value="">Beliebig</option>
                            <option value="1000">1.000 km</option>
                            <option value="5000">5.000 km</option>
                            <option value="10000">10.000 km</option>
                            <option value="20000">20.000 km</option>
                            <option value="25000">25.000 km</option>
                            <option value="50000">50.000 km</option>
                            <option value="75000">75.000 km</option>
                            <option value="100000">100.000 km</option>
                            <option value="150000">150.000 km</option>
                            <option value="200000">200.000 km</option>
                            <option value="250000">250.000 km</option>
                            <option value="300000">300.000 km</option>
                            <option value="350000">350.000 km</option>
                            <option value="450000">450.000 km</option>
                            <option value="550000">550.000 km</option>
                            <option value="650000">650.000 km</option>
                            <option value="750000">750.000 km</option>
                            <option value="800000">800.000 km</option>
                        </select>
                    </label>

                    <div className="cars-price-filter">
                    <div className="cars-price-heading">
                        <div>
                            <span>Preis von</span>
                            <strong>{formatPrice(minPrice)}</strong>
                        </div>
                        <div>
                            <span>Preis bis</span>
                            <strong>{formatPrice(maxPrice)}</strong>
                        </div>
                    </div>

                    <div className="cars-range-group">
                        <input
                            aria-label="Mindestpreis"
                            type="range"
                            min="0"
                            max="100000"
                            step="500"
                            value={minPrice}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setMinPrice(Math.min(value, maxPrice));
                            }}
                        />

                        <input
                            aria-label="Höchstpreis"
                            type="range"
                            min="0"
                            max="100000"
                            step="500"
                            value={maxPrice}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setMaxPrice(Math.max(value, minPrice));
                            }}
                        />
                    </div>

                    <div className="cars-range-labels">
                        <span>0 €</span>
                        <span>100.000 €</span>
                    </div>
                </div>
                </div>

                <button
                    type="button"
                    className="cars-search-button"
                    onClick={() =>
                        document.getElementById("cars-results")?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }
                >
                    <Search size={18} />
                    Fahrzeuge anzeigen ({filteredCars.length})
                </button>
            </section>

            <section className="cars-results" id="cars-results">
                <div className="cars-results-heading">
                    <div>
                        <span className="cars-eyebrow">UNSER ANGEBOT</span>
                        <h2>Unsere Fahrzeuge</h2>
                    </div>
                    <span className="cars-result-count">
                        {filteredCars.length} Fahrzeuge
                    </span>
                </div>

                {loading ? (
                    <p className="cars-status">Fahrzeuge werden geladen ...</p>
                ) : message ? (
                    <p className="cars-status cars-error">{message}</p>
                ) : filteredCars.length === 0 ? (
                    <div className="cars-empty">
                        <CarFront size={36} />
                        <h3>Keine passenden Fahrzeuge gefunden</h3>
                        <p>Ändern Sie Ihre Filter oder setzen Sie diese zurück.</p>
                        <button
                            type="button"
                            className="cars-search-button"
                            onClick={resetFilters}
                        >
                            Filter zurücksetzen
                        </button>
                    </div>
                ) : (
                    <div className="cars-gallery">
                        {filteredCars.map((car) => (
                            <article className="cars-card" key={car._id}>
                                <div className="cars-card-image">
                                    {car.images?.length > 0 ? (
                                        <img
                                            src={`http://localhost:5000${car.images[0]}`}
                                            alt={car.brandModel || "Fahrzeug"}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="cars-no-image">
                                            <CarFront size={42} />
                                            <span>Kein Bild verfügbar</span>
                                        </div>
                                    )}

                                    <span className="cars-type-badge">
                                        {car.vehicleType || "Fahrzeug"}
                                    </span>

                                    {car.images?.length > 1 && (
                                        <span className="cars-image-count">
                                            {car.images.length} Bilder
                                        </span>
                                    )}
                                </div>

                                <div className="cars-card-content">
                                    <span className="cars-offer-number">
                                        ANGEBOTSNUMMER: {car.offerNumber}
                                    </span>

                                    <h3>{car.brandModel}</h3>
                                    <strong className="cars-card-price">
                                        {formatPrice(Number(car.price) || 0)}
                                    </strong>

                                    <div className="cars-card-specs">
                                        <span>
                                            <CalendarDays size={16} />
                                            {car.year || "–"}
                                        </span>
                                        <span>
                                            <Gauge size={16} />
                                            {Number(car.mileage || 0).toLocaleString("de-DE")} km
                                        </span>
                                    </div>

                                    <div className="cars-card-footer">
                                        <span>
                                            {car.color || "Farbe nicht angegeben"}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(`/cars/${car._id}`)
                                            }
                                        >
                                            Details ansehen
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Cars;