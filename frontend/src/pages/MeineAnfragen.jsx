import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const MeineAnfragen = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [editingRequest, setEditingRequest] = useState(null);
    const [editImages, setEditImages] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!token) {
                return;
            }
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/sell-requests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRequests(response.data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Anfragen.", error);

                setMessage(error.response?.data?.message || "Fehler beim Abrufen der Anfragen.");
            }
        };

        fetchRequests();
    }, [token]);

    const handleUpdate = async (e) =>{
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("vehicleType", editingRequest.vehicleType);
            formData.append("brandModel", editingRequest.brandModel);
            formData.append("year", editingRequest.year);
            formData.append("mileage", editingRequest.mileage);
            formData.append("desiredPrice", editingRequest.desiredPrice);
            formData.append("phone", editingRequest.phone);
            formData.append("email", editingRequest.email);
            formData.append("additionalInfo", editingRequest.additionalInfo || "");
            editImages.forEach((image) => {
                formData.append("images", image);
            });

            const response = await api.put(`/sell-requests/${editingRequest._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === editingRequest._id ? response.data.request : request
                )
            );
            setEditingRequest(null);
            setEditImages([]);
            setMessage(response.data.message || "Verkaufsanfrage erfolgreich aktualisiert.");
        }catch (error) {
            console.error("Fehler beim Aktualisieren der Anfrage.", error);

            setMessage(error.response?.data?.message || "Die Anfrage konnte nicht aktualisiert werden.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Möchten Sie diese Anfrage wirklich löschen?")) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await api.delete(`/sell-requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
            setMessage(response.data.message || "Verkaufsanfrage erfolgreich gelöscht.");
        } catch (error) {
            console.error("Fehler beim Löschen der Anfrage.", error);

            setMessage(error.response?.data?.message || "Die Anfrage konnte nicht gelöscht werden.");
        }
    };

    return (
        <div>
            <h1>Meine Anfragen</h1>

            {!token ? (
                <div>
                    <p>Bitte melden Sie sich an, um Ihre Anfragen einzusehen.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}>Jetzt Anmeldung</button>
                </div>
            ) : (
                <>
                    {message && <p>{message}</p>}

            {requests.length === 0 && !message && (
                <p>Keine Anfragen vorhanden.</p>
            )}
                <ul>
                    {requests.map((request) => (
                        <li key={request._id}>
                            <h2>{request.brandModel}</h2>

                            <p>Fahrzeug: {request.vehicleType}</p>
                            <p>Baujahr: {request.year}</p>
                            <p>Kilometerstand: {request.mileage}</p>
                            <p>Gewünschter Preis: {request.desiredPrice} €</p>
                            <p>Telefonnummer: {request.phone}</p>
                            <p>E-Mail-Adresse: {request.email}</p>
                            <p>Status: <strong>{request.status}</strong></p>

                            {request.additionalInfo && (
                                <p>Zusätzliche Informationen: {request.additionalInfo}</p>
                            )}

                            
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setEditingRequest({ ...request });
                                        setEditImages([]);
                                    }}
                                >Bearbeiten</button>

                                <button 
                                    type="button"
                                    onClick={() => handleDelete(request._id)}
                                >Löschen</button>

                            {request.images?.length >0 && (
                                <div>
                                    {request.images.map((image, index) => (
                                        <img key={index} 
                                        src={`http://localhost:5000${image}`} 
                                        alt={request.brandModel} 
                                        style={{maxWidth: "200px", marginRight: "10px"}} />
                                    ))}
                                </div>  
                            )}
                        </li>
                    ))}
                </ul>
                {editingRequest && (
                    <div>
                        <h2>Verkaufsanfrage bearbeiten</h2>

                        {editingRequest.images?.length > 0 && (
                            <div>
                                <h3>Aktuelle Bilder</h3>

                                {editingRequest.images.map((image, index) => (
                                        <img key={index} 
                                        src={`http://localhost:5000${image}`} 
                                        alt={editingRequest.brandModel} 
                                        style={{maxWidth: "200px", marginRight: "10px"}} />
                                    ))
                                }
                            </div>
                        )}

                    <form onSubmit={handleUpdate}>

                        <input
                            type="text"
                            value={editingRequest.vehicleType}
                            onChange={(e) => setEditingRequest({ ...editingRequest, vehicleType: e.target.value })}
                            placeholder="Fahrzeugtyp"
                        />
                        <input
                            type="text"
                            value={editingRequest.brandModel}
                            onChange={(e) => setEditingRequest({ ...editingRequest, brandModel: e.target.value })}
                            placeholder="Marke/Modell"
                        />
                        <input
                            type="number"
                            value={editingRequest.year}
                            onChange={(e) => setEditingRequest({ ...editingRequest, year: e.target.value })}
                            placeholder="Baujahr"
                        />
                        <input
                            type="number"
                            value={editingRequest.mileage}
                            onChange={(e) => setEditingRequest({ ...editingRequest, mileage: e.target.value })}
                            placeholder="Kilometerstand"
                        />
                        <input
                            type="number"
                            value={editingRequest.desiredPrice}
                            onChange={(e) => setEditingRequest({ ...editingRequest, desiredPrice: e.target.value })}
                            placeholder="Gewünschter Preis"
                        />
                        <input
                            type="text"
                            value={editingRequest.phone}
                            onChange={(e) => setEditingRequest({ ...editingRequest, phone: e.target.value })}
                            placeholder="Telefonnummer"
                        />
                        <input
                            type="email"
                            value={editingRequest.email}
                            onChange={(e) => setEditingRequest({ ...editingRequest, email: e.target.value })}
                            placeholder="E-Mail"
                        />
                        <div>
                            <label>Zusätzliche Informationen (optional):</label>
                            <textarea
                                value={editingRequest.additionalInfo || ""}
                                onChange={(e) => setEditingRequest({ ...editingRequest, additionalInfo: e.target.value })}
                                placeholder="Weitere Informationen zu Ihrem Fahrzeug"
                                rows={4}
                            />
                        </div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setEditImages(Array.from(e.target.files))}
                            />
                            <button type="submit">Änderungen speichern</button>
                            <button type="button" onClick={() => {
                                setEditImages([]);
                                setEditingRequest(null);
                            }}>Abbrechen
                            </button>
                    </form>
                </div>
                )}
            </>
            )}
        </div>
);
};

export default MeineAnfragen;