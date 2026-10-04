import { useState, useEffect } from "react";
import api from "../services/api";

function AdminSellRequests() {
    const [sellRequests, setSellRequests] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSellRequests = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/sell-requests/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSellRequests(response.data);
            } catch (error) {
                console.error("Fehler beim laden der Verkaufsanfragen:", error);
                setMessage(error.response?.data?.message || "Die Verkaufsanfragen konnten nicht geladen werden.");
            }
        };
        fetchSellRequests();
    }, []);
    
    const handleStatusChange = async (id, status) => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.put(`/sell-requests/admin/${id}/status`, { status }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSellRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === id ? { ...request, status:response.data.request.status } : request
                    )
                );

            } catch (error) {
                console.error("Fehler beim Aktualisieren des Status:", error);
                setMessage(error.response?.data?.message || "Der Status konnte nicht aktualisiert werden.");
            }
        };
    return (
        <div>
            <h1>Verkaufsanfragen</h1>
            {message && <p>{message}</p>}
            {sellRequests.length === 0 ? (
                <p>Keine Verkaufsanfragen vorhanden.</p>
            ) : (
            <div>
                {sellRequests.map((request) => (
                    <div key={request._id}>
                        <p>Benutzer: {request.user.name} {request.user.surname}</p>
                        <p>Email: {request.user.email}</p>
                        <p>Telefon: {request.user.phone}</p>
                        <p>Adresse: {request.user.adress}</p>
                        <p>Fahrzeugtyp: {request.vehicleType}</p>
                        <p>Marke / Modell: {request.brandModel}</p>
                        <p>Baujahr: {request.year}</p>
                        <p>Kilometerstand: {request.mileage} km</p>
                        <p>Preis: {request.desiredPrice} €</p>
                        <p>Status: {request.status}</p>
                        {request.images && request.images.length > 0 && (
                            <div>
                                {request.images.map((image, index) => (
                                    <img key={index} 
                                    src={`http://localhost:5000${image}`} 
                                    alt={`${request.brandModel} $${index + 1}`}
                                    style={{ width: "150px",height: "100px",objectFit: "cover", margin: "5px" }} />
                                ))}
                            </div>
                        )}

                        <div>
                            <button
                                type="button"
                                onClick={() => handleStatusChange(request._id, 'In Bearbeitung')}>In Bearbeitung
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange(request._id, 'Angenommen')}>Angenommen
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange(request._id, 'Abgelehnt')}>Abgelehnt
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default AdminSellRequests;