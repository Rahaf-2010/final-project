import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCars.css";
import { Trash2, Pencil, ChevronLeft, ChevronRight, CarFront } from "lucide-react";
import api from "../services/api";

function AdminCars() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [editImages, setEditImages] = useState([]);
    const [galleryIndexes, setGalleryIndexes] = useState({});
    const [lightbox, setLightbox] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/admin/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(response.data.message);
                const carsResponse = await api.get("/cars");
                setCars(carsResponse.data);
                
            } catch (error) {
                console.error("Fehler beim Laden des Admin-Bereichs:", error);
                setMessage(error.response?.data?.message || "Der Admin-Bereich konnte nicht geladen werden.");
                
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const [formData, setFormData] = useState({
        vehicleType: "",
        brandModel: "",
        year: "",
        mileage: "",
        price: "",
        description: "",
        color: "",
        images: []
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();

            data.append("vehicleType", formData.vehicleType);
            data.append("brandModel", formData.brandModel);
            data.append("year", formData.year);
            data.append("mileage", formData.mileage);
            data.append("price", formData.price);
            data.append("description", formData.description);
            data.append("color", formData.color);

            formData.images.forEach((image) => {
                data.append("images", image);
            });

            const response = await api.post("/cars", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(`${response.data.message} Angebotsnummer: ${response.data.car.offerNumber}`);

            setCars((prevCars) => [...prevCars, response.data.car]);

            setFormData({
                vehicleType: "",
                brandModel: "",
                year: "",
                mileage: "",
                price: "",
                description: "",
                color: "",
                images: []
            });
        } catch (error) {
            console.error("Fehler beim Erstellen des Fahrzeugs:", error);
            setMessage(error.response?.data?.message || "Das Fahrzeug konnte nicht erstellt werden.");
        }
    };


    const handleDeleteCar = async (id) => {
        if (!window.confirm("Sind Sie sicher, dass Sie dieses Fahrzeug löschen möchten?")) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await api.delete(`/cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCars((prevCars) => prevCars.filter((car) => car._id !== id));
            setMessage(response.data.message);
            
        } catch (error) {
            console.error("Fehler beim Löschen des Fahrzeugs:", error);
            setMessage(error.response?.data?.message || "Das Fahrzeug konnte nicht gelöscht werden.");
        }
    };

    const handleUpdateCar = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const data = new FormData();

            data.append("vehicleType", editingCar.vehicleType);
            data.append("brandModel", editingCar.brandModel);
            data.append("year", editingCar.year);
            data.append("mileage", editingCar.mileage);
            data.append("price", editingCar.price);
            data.append("color", editingCar.color);
            data.append("description", editingCar.description);

            editImages.forEach((image) => {
                data.append("images", image);
            });

            const response = await api.put(`/cars/${editingCar._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCars((prevCars) =>
                prevCars.map((car) => (car._id === editingCar._id ? response.data.car : car))
            );

            setEditingCar(null);
            setEditImages([]);

            setMessage(response.data.message || "Das Fahrzeug wurde erfolgreich aktualisiert.");

        } catch (error) {
            console.error("Fehler beim Aktualisieren des Fahrzeugs:", error);

            setMessage(error.response?.data?.message || "Das Fahrzeug konnte nicht aktualisiert werden.");
        }
    };
    return (
        <main className="admin-cars-page">
            <header className="admin-cars-header">

                <div className="admin-cars-header-text">
                    <span className="admin-cars-eyebrow">
                        ISSA AUTOMOBILE
                    </span>

                    <h1>Fahrzeuge verwalten</h1>
                    <p>Erfassen und verwalten Sie Ihre Fahrzeuge.</p>
                </div>

                <div className="admin-cars-counter">
                    <span>Fahrzeuge gesamt</span>
                    <strong>{cars.length}</strong>
                </div>
            </header>
            {loading ? (
                <p>Lädt...</p>
            ) : (
                <p>{message}</p>
            )}

            <h2>Fahrzeug erstellen</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    placeholder="Fahrzeugtyp"
                    required
                />
                <input
                    type="text"
                    name="brandModel"
                    value={formData.brandModel}
                    onChange={handleChange}
                    placeholder="Marke/Modell"
                    required
                />
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Baujahr"
                    required
                />
                <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="Kilometerstand"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Preis"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Beschreibung"
                    required
                />
                <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Farbe"
                    required
                />
                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="submit">Erstellen</button>
            </form>

            <h2>Verfügbare Fahrzeuge</h2>
            {cars.length === 0 ? (
                <p>Keine Fahrzeuge verfügbar.</p>
            ) : (
                <div className="admin-cars-list">
                    {cars.map((car) => {
                        const images = car.images || [];
                        const activeIndex = Math.min(
                            galleryIndexes[car._id] || 0,
                            Math.max(images.length - 1, 0)
                        );

                        const changeImage = (nextIndex) => {
                            setGalleryIndexes((previous) => ({
                                ...previous,
                                [car._id]: (nextIndex + images.length) % images.length,
                            }));
                        };

                    return (
                        <article className="admin-car-card" key={car._id}>
                            <div className="admin-car-gallery">
                                {images.length > 0 ? (
                                    <>
                                        <button
                                            type="button"
                                            className="admin-car-main-image"
                                            onClick={() =>
                                                setLightbox({
                                                    carId: car._id,
                                                    index: activeIndex,
                                                })
                                            }
                                            aria-label="Bild vergrößern"
                                        >
                                            <img
                                                src={`http://localhost:5000${images[activeIndex]}`}
                                                alt={car.brandModel}
                                            />
                                        </button>

                                        <span className="admin-car-image-count">
                                            {activeIndex + 1} / {images.length}
                                        </span>

                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="admin-car-gallery-arrow prev"
                                                    onClick={() => changeImage(activeIndex - 1)}
                                                    aria-label="Vorheriges Bild"
                                                >
                                                    <ChevronLeft size={21} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-car-gallery-arrow next"
                                                    onClick={() => changeImage(activeIndex + 1)}
                                                    aria-label="Nächstes Bild"
                                                >
                                                    <ChevronRight size={21} />
                                                </button>

                                                <div className="admin-car-thumbnails">
                                                    {images.map((image, index) => (
                                                        <button
                                                            type="button"
                                                            key={`${image}-${index}`}
                                                            className={`admin-car-thumbnail ${
                                                                index === activeIndex ? "active" : ""
                                                            }`}
                                                            onClick={() => changeImage(index)}
                                                            aria-label={`Bild ${index + 1} anzeigen`}
                                                        >
                                                            <img
                                                                src={`http://localhost:5000${image}`}
                                                                alt=""
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="admin-car-no-image">
                                        <CarFront size={42} />
                                        <span>Kein Bild verfügbar</span>
                                    </div>
                                )}
                            </div>

                            <div className="admin-car-content">
                                <span className="admin-car-number">
                                    ANGEBOTSNUMMER: {car.offerNumber}
                                </span>

                                <h3>{car.brandModel}</h3>

                                <strong className="admin-car-price">
                                    {Number(car.price).toLocaleString("de-DE")} €
                                </strong>

                                <div className="admin-car-specs">
                                    <span>Typ: {car.vehicleType}</span>
                                    <span>Baujahr: {car.year}</span>
                                    <span>
                                        Kilometer: {Number(car.mileage).toLocaleString("de-DE")} km
                                    </span>
                                    <span>Farbe: {car.color || "–"}</span>
                                </div>

                                <div className="admin-car-actions">
                                    <button
                                        type="button"
                                        className="admin-car-details"
                                        onClick={() => navigate(`/cars/${car._id}`)}
                                    >
                                        Details Ansehen
                                    </button>
                                    <button
                                        type="button"
                                        className="admin-car-edit"
                                        onClick={() => {
                                            setEditingCar({ ...car });
                                            setEditImages([]);
                                        }}
                                    >
                                        <Pencil size={16} />
                                        Bearbeiten
                                    </button>

                                    <button
                                        type="button"
                                        className="admin-car-delete"
                                        onClick={() => handleDeleteCar(car._id)}
                                    >
                                        <Trash2 size={16} />
                                        Löschen
                                    </button>
                                </div>

                    {editingCar?._id === car._id && (
                        <div className="admin-car-edit-panel">
                            <h3>Fahrzeug bearbeiten</h3>

                            <form
                                className="admin-car-edit-form"
                                onSubmit={handleUpdateCar}
                            >
                                {[
                                    ["vehicleType", "Fahrzeugtyp", "text"],
                                    ["brandModel", "Marke / Modell", "text"],
                                    ["year", "Baujahr", "number"],
                                    ["mileage", "Kilometerstand", "number"],
                                    ["price", "Preis (€)", "number"],
                                    ["color", "Farbe", "text"],
                                ].map(([name, label, type]) => (
                                    <div className="admin-cars-field" key={name}>
                                        <label>{label}</label>
                                        <input
                                            type={type}
                                            value={editingCar[name] ?? ""}
                                            onChange={(e) =>
                                                setEditingCar({
                                                    ...editingCar,
                                                    [name]: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                ))}

                                <div className="admin-cars-field">
                                    <label>Beschreibung</label>
                                    <textarea
                                        value={editingCar.description || ""}
                                        onChange={(e) =>
                                            setEditingCar({
                                                ...editingCar,
                                                description: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="admin-cars-field">
                                    <label>Neue Bilder auswählen (optional)</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            setEditImages(Array.from(e.target.files || []))
                                        }
                                    />
                                </div>

                                <div className="admin-car-edit-actions">
                                    <button
                                        className="admin-cars-button"
                                        type="submit"
                                    >
                                        Änderungen speichern
                                    </button>

                                    <button
                                        className="admin-car-cancel"
                                        type="button"
                                        onClick={() => {
                                            setEditingCar(null);
                                            setEditImages([]);
                                        }}
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </article>
        );
    })}
</div>
            )}

            {message && <p>{message}</p>}

            {lightbox && (() => {
    const selectedCar = cars.find((car) => car._id === lightbox.carId);
    const images = selectedCar?.images || [];

    if (!selectedCar || images.length === 0) return null;

    const index = lightbox.index;

    const moveLightbox = (direction) => {
        setLightbox({
            carId: selectedCar._id,
            index: (index + direction + images.length) % images.length,
        });
    };

    return (
        <div
            className="admin-car-lightbox"
            onClick={() => setLightbox(null)}
            onKeyDown={(e) => {
                if (e.key === "Escape") setLightbox(null);
                if (e.key === "ArrowLeft") moveLightbox(-1);
                if (e.key === "ArrowRight") moveLightbox(1);
            }}
        >
            <button
                type="button"
                className="admin-car-lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Schließen"
            >
                ×
            </button>

            {images.length > 1 && (
                <button
                    type="button"
                    className="admin-car-lightbox-arrow prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        moveLightbox(-1);
                    }}
                    aria-label="Vorheriges Bild"
                >
                    <ChevronLeft size={26} />
                </button>
            )}

            <img
                src={`http://localhost:5000${images[index]}`}
                alt={selectedCar.brandModel}
                onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
                <button
                    type="button"
                    className="admin-car-lightbox-arrow next"
                    onClick={(e) => {
                        e.stopPropagation();
                        moveLightbox(1);
                    }}
                    aria-label="Nächstes Bild"
                >
                    <ChevronRight size={26} />
                </button>
            )}
        </div>
    );
})()}
        </main>
    );
}

export default AdminCars;