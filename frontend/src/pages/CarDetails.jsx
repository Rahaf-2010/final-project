import { useState, useEffect } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import "./CarDetails.css";
import {
    CarFront,
    CalendarDays,
    Gauge,
    Palette,
    FileText,
} from "lucide-react";

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await api.get(`/cars/${id}`);
                setCar(response.data);
                setSelectedImageIndex(0);
            } catch (error) {
                console.error("Fehler beim Abrufen des Fahrzeugs:", error);
                setMessage(
                    error.response?.data?.message ||
                    "Das Fahrzeug konnte nicht geladen werden"
                );
            }
        };

        fetchCar();
    }, [id]);

    if (message) {
        return <p className="car-details-status">{message}</p>;
    }

    if (!car) {
        return (
            <p className="car-details-status">
                Fahrzeugdetails werden geladen...
            </p>
        );
    }

    const images = car.images || [];

    const changeImage = (direction) => {
        if (images.length < 2) return;

        const nextIndex =
            (selectedImageIndex + direction + images.length) % images.length;

        setSelectedImageIndex(nextIndex);
    };

    const imageUrl = (image) => `http://localhost:5000${image}`;

    return (
        <main className="car-details-page">
            <article className="car-details-card">
                <header className="car-details-header">
                    <span className="car-details-eyebrow">
                        UNSER FAHRZEUGANGEBOT
                    </span>

                    <h1>{car.brandModel}</h1>

                    {car.offerNumber && (
                        <div className="car-offer-number">
                            <span>Angebotsnummer</span>
                            <strong>{car.offerNumber}</strong>
                        </div>
                    )}
                </header>

                <section className="car-gallery">
                    {images.length > 0 ? (
                        <>
                            <div className="car-gallery-main">
                                <img
                                    src={imageUrl(images[selectedImageIndex])}
                                    alt={`${car.brandModel} – Bild ${selectedImageIndex + 1}`}
                                    onClick={() =>
                                        setSelectedImage(images[selectedImageIndex])
                                    }
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            className="car-gallery-arrow car-gallery-prev"
                                            onClick={() => changeImage(-1)}
                                            aria-label="Vorheriges Bild"
                                        >
                                            ‹
                                        </button>

                                        <button
                                            type="button"
                                            className="car-gallery-arrow car-gallery-next"
                                            onClick={() => changeImage(1)}
                                            aria-label="Nächstes Bild"
                                        >
                                            ›
                                        </button>
                                    </>
                                )}

                                <span className="car-gallery-counter">
                                    {selectedImageIndex + 1} / {images.length}
                                </span>

                                <button
                                    type="button"
                                    className="car-gallery-expand"
                                    onClick={() =>
                                        setSelectedImage(images[selectedImageIndex])
                                    }
                                >
                                    Bild vergrößern ↗️
                                </button>
                            </div>

                            {images.length > 1 && (
                                <div className="car-gallery-thumbnails">
                                    {images.map((image, index) => (
                                        <button
                                            type="button"
                                            key={image + index}
                                            className={`car-gallery-thumbnail ${
                                                selectedImageIndex === index
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                            aria-label={`Bild ${index + 1} anzeigen`}
                                        >
                                            <img
                                                src={imageUrl(image)}
                                                alt={`${car.brandModel} ${index + 1}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="car-gallery-empty">
                            Keine Fahrzeugbilder verfügbar
                        </div>
                    )}
                </section>

                <section className="car-info-section">
                    <div className="car-info-heading">
                        <div>
                            <span className="car-info-eyebrow">
                                FAHRZEUGDETAILS
                            </span>
                            <h2>Alle Informationen auf einen Blick</h2>
                        </div>
                    </div>

                    <div className="car-info-grid">
                        <div className="car-info-item">
                            <CarFront />
                            <div>
                                <span>Fahrzeugtyp</span>
                                <strong>{car.vehicleType || "Keine Angabe"}</strong>
                            </div>
                        </div>

                        <div className="car-info-item">
                            <CalendarDays />
                            <div>
                                <span>Baujahr</span>
                                <strong>{car.year || "Keine Angabe"}</strong>
                            </div>
                        </div>

                        <div className="car-info-item">
                            <Gauge />
                            <div>
                                <span>Kilometerstand</span>
                                <strong>
                                    {Number(car.mileage).toLocaleString("de-DE")} km
                                </strong>
                            </div>
                        </div>

                        <div className="car-info-item">
                            <Palette />
                            <div>
                                <span>Farbe</span>
                                <strong>{car.color || "Keine Angabe"}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="car-price-panel">
                        <div>
                            <span>Unser Angebotspreis</span>
                            <p>Transparent und übersichtlich</p>
                        </div>
                        <strong>
                            {Number(car.price).toLocaleString("de-DE")} €
                        </strong>
                    </div>

                    {car.description && (
                        <div className="car-description-panel">
                            <h3>
                                <FileText size={20} />
                                Fahrzeugbeschreibung
                            </h3>
                            <p>{car.description}</p>
                        </div>
                    )}

                    {car.offerNumber && (
                        <p className="car-inquiry-note">
                            Bitte geben Sie bei Ihrer Anfrage die Angebotsnummer
                            <strong> {car.offerNumber} </strong>
                            an.
                        </p>
                    )}
                </section>
            </article>

            {selectedImage && (
                <div
                    className="car-lightbox"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        className="car-lightbox-close"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Schließen"
                    >
                        ×
                    </button>

                    {images.length > 1 && (
                        <button
                            type="button"
                            className="car-lightbox-arrow car-lightbox-prev"
                            onClick={(event) => {
                                event.stopPropagation();
                                changeImage(-1);
                                setSelectedImage(
                                    images[
                                        (selectedImageIndex - 1 + images.length) %
                                        images.length
                                    ]
                                );
                            }}
                            aria-label="Vorheriges Bild"
                        >
                            ‹
                        </button>
                    )}

                    <img
                        src={imageUrl(selectedImage)}
                        alt={car.brandModel}
                        onClick={(event) => event.stopPropagation()}
                    />

                    {images.length > 1 && (
                        <button
                            type="button"
                            className="car-lightbox-arrow car-lightbox-next"
                            onClick={(event) => {
                                event.stopPropagation();
                                changeImage(1);
                                setSelectedImage(
                                    images[(selectedImageIndex + 1) % images.length]
                                );
                            }}
                            aria-label="Nächstes Bild"
                        >
                            ›
                        </button>
                    )}

                    <span className="car-lightbox-counter">
                        {selectedImageIndex + 1} / {images.length}
                    </span>
                </div>
            )}
        </main>
    );
}

export default CarDetails;