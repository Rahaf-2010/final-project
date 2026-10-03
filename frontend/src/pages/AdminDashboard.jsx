import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [editImages, setEditImages] = useState([]);

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
        <div>
            <h1>Admin Dashboard</h1>
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
                <ul>
                    {cars.map((car) => (
                        <li key={car._id}>
                            <h3>{car.brandModel}</h3>
                            <p>Angebotsnummer: {car.offerNumber}</p>
                            <p>Fahrzeugtyp: {car.vehicleType}</p>
                            <p>Baujahr: {car.year}</p>
                            <p>Kilometerstand: {car.mileage} km</p>
                            <p>Preis: {car.price} €</p>
                            <p>Farbe: {car.color}</p>
                            <p>{car.description}</p>

                            {car.images && car.images.length > 0 && (
                                <div>
                                    {car.images.map((image, index) => (
                                        <img key={index} 
                                        src={`http://localhost:5000${image}`} 
                                        alt={car.brandModel} 
                                        style={{ maxWidth: "200px", margin: "5px" }} />
                                    ))}
                                </div>
                            )}

                            <button
                            type="button"
                            onClick={() => {
                                setEditingCar({...car});
                                setEditImages(car.images || []);
                            }}>Bearbeiten
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDeleteCar(car._id)}
                            >
                                Löschen
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {editingCar && (
                <div>
                    <h2>Fahrzeug bearbeiten</h2>

                    <form onSubmit={handleUpdateCar}>

                        <input
                            type="text"
                            value={editingCar.vehicleType}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, vehicleType: e.target.value })
                            }
                            placeholder="Fahrzeugtyp"
                            required
                            />

                        <input
                            type="text"
                            value={editingCar.brandModel}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, brandModel: e.target.value })
                            }
                            placeholder="Marke / Modell"
                            required
                        />

                        <input
                            type="number"
                            value={editingCar.year}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, year: e.target.value })
                            }
                            placeholder="Baujahr"
                            required
                        />

                        <input
                            type="number"
                            value={editingCar.mileage}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, mileage: e.target.value })
                            }
                            placeholder="Kilometerstand"
                            required
                        />

                        <input
                            type="number"
                            value={editingCar.price}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, price: e.target.value })
                            }
                            placeholder="Preis"
                            required
                        />

                        <input
                            type="text"
                            value={editingCar.color}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, color: e.target.value })
                            }
                            placeholder="Farbe"
                            required
                        />  

                        <textarea
                            value={editingCar.description}
                            onChange={(e) =>
                                setEditingCar({ ...editingCar, description: e.target.value })
                            }
                            placeholder="Beschreibung"
                            required
                        />

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setEditImages(Array.from(e.target.files))
                            }
                        />

                        <button type="submit">Änderungen speichern</button>

                        <button type="button" onClick={() => {
                            setEditingCar(null);
                            setEditImages([]);
                        }}>Abbrechen</button>

                    </form>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminDashboard;