import {useState, useEffect} from 'react';
import api from "../services/api";
import {useParams} from "react-router-dom";

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await api.get(`/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error('Fehler beim Abrufen des Fahrzeugs:', error);
                setMessage(error.response?.data?.message || "Das Fahrzeug konnte nicht geladen werden");
            }
        };
        fetchCar();
    }, [id]);  

    if (message) {
        return <p>{message}</p>;
    }
    if (!car) {
        return <p>Lade Fahrzeugdetails...</p>;
    }

    return (
        <div>
            <h1>{car.brandModel}</h1>

            {car.offerNumber && (
                <p>Angebotsnummer: {car.offerNumber}</p>
            )}

            {car.images && car.images.length > 0 && (
                <div>
                    {car.images.map((image, index) => (
                        <img 
                            key={index}
                            src={`http://localhost:5000${image}`}
                            alt={`${car.brandModel} ${index + 1}`} 
                            style={{width: '200px', height: 'auto'}} 
                            onClick={() => {
                                setSelectedImage(image);
                                setSelectedImageIndex(index);
                            }}
                            />
                    ))}
                </div>
            )}

            {selectedImage && (
                <div>
                    <button onClick={() => setSelectedImage(null)}>x</button>

                    <img 
                        src={`http://localhost:5000${selectedImage}`}
                        alt={car.brandModel}
                        style={{width: '400px', height: 'auto'}} 
                    />

                    <button
                    onClick={() => {
                        const previousIndex = selectedImageIndex === 0 ? car.images.length - 1 : selectedImageIndex - 1;
                        setSelectedImage(car.images[previousIndex]);
                        setSelectedImageIndex(previousIndex);
                    }}
                    >
                        zurück
                    </button>
                    <button
                    onClick={() => {
                        const nextIndex = selectedImageIndex === car.images.length - 1 ? 0 : selectedImageIndex + 1;
                        setSelectedImage(car.images[nextIndex]);
                        setSelectedImageIndex(nextIndex);
                    }}
                    >
                        Nächste
                    </button>
                </div>

            )}
            <p>Fahrzeugtyp: {car.vehicleType}</p>
            <p>Baujahr: {car.year}</p>
            <p>Kilometerstand: {car.mileage} km</p>
            <p>Preis: {car.price} €</p>

            {car.description && (
                <p>{car.description}</p>
            )}

            {car.offerNumber && (
                <p>Bitte geben Sie bei Ihrer Anfrage die Angebotsnummer{" "}
                {car.offerNumber} an.</p>
            )}

            <div>
                <h2>Kontakt zum Verkäufer</h2>
                <p>Name: {car.sellerName}</p>

                <p>E-mail:{" "}
                    <a href={`mailto:${car.sellerEmail}`}>{car.sellerEmail}</a>
                </p>

                <p>Telefon: {" "}
                    <a href={`tel:${car.sellerPhone}`}>{car.sellerPhone}</a>
                </p>

                <a 
                    href={`https://wa.me/${car.sellerPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WhatsApp
                </a>
                
            </div>
        </div>
    ); 
}

export default CarDetails;