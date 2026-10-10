import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./MeineAnfragen.css";

const MeineAnfragen = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [editingRequest, setEditingRequest] = useState(null);
    const [editImages, setEditImages] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!token) return;

            try {
                const response = await api.get("/sell-requests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRequests(response.data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Anfragen.", error);
                setMessage(
                    error.response?.data?.message ||
                    "Fehler beim Abrufen der Anfragen."
                );
            }
        };

        fetchRequests();
    }, [token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingRequest) return;

        try {
            const formData = new FormData();

            formData.append("vehicleType", editingRequest.vehicleType || "");
            formData.append("brandModel", editingRequest.brandModel || "");
            formData.append("year", editingRequest.year ?? "");
            formData.append("mileage", editingRequest.mileage ?? "");
            formData.append("desiredPrice", editingRequest.desiredPrice ?? "");
            formData.append("phone", editingRequest.phone || "");
            formData.append("email", editingRequest.email || "");
            formData.append(
                "additionalInfo",
                editingRequest.additionalInfo || ""
            );

            editImages.forEach((image) => {
                formData.append("images", image);
            });

            const response = await api.put(
                `/sell-requests/${editingRequest._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === editingRequest._id
                        ? response.data.request
                        : request
                )
            );

            setEditingRequest(null);
            setEditImages([]);
            setMessage(
                response.data.message ||
                "Verkaufsanfrage erfolgreich aktualisiert."
            );
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Anfrage.", error);
            setMessage(
                error.response?.data?.message ||
                "Die Anfrage konnte nicht aktualisiert werden."
            );
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Möchten Sie diese Anfrage wirklich löschen?")) {
            return;
        }

        try {
            const response = await api.delete(`/sell-requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== id)
            );

            if (editingRequest?._id === id) {
                setEditingRequest(null);
                setEditImages([]);
            }

            setMessage(
                response.data.message ||
                "Verkaufsanfrage erfolgreich gelöscht."
            );
        } catch (error) {
            console.error("Fehler beim Löschen der Anfrage.", error);
            setMessage(
                error.response?.data?.message ||
                "Die Anfrage konnte nicht gelöscht werden."
            );
        }
    };

    const startEditing = (request) => {
        setEditingRequest({ ...request });
        setEditImages([]);
        setMessage("");
    };

    const cancelEditing = () => {
        setEditingRequest(null);
        setEditImages([]);
    };

    return (
        <div className="meine-anfragen-page">
            <h1>Meine Anfragen</h1>

            {!token ? (
                <div className="requests-login-prompt">
                    <p>
                        Bitte melden Sie sich an, um Ihre Anfragen einzusehen.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Jetzt anmelden
                    </button>
                </div>
            ) : (
                <>
                    {message && (
                        <p className="requests-message" role="status">
                            {message}
                        </p>
                    )}

                    {requests.length === 0 && !message && (
                        <p className="requests-empty">
                            Sie haben noch keine Anfragen gestellt.
                        </p>
                    )}

                    <ul className="requests-list">
                        {requests.map((request) => {
                            const isEditing =
                                editingRequest?._id === request._id;

                            return (
                                <li
                                    key={request._id}
                                    className="request-card"
                                >
                                    {isEditing ? (
                                        <>
                                            <div className="request-card-header">
                                                <div>
                                                    <span className="request-eyebrow">
                                                        FAHRZEUGANFRAGE
                                                    </span>
                                                    <h2>Anfrage bearbeiten</h2>
                                                </div>

                                                <span className="request-status">
                                                    {request.status}
                                                </span>
                                            </div>

                                            {request.images?.length > 0 && (
                                                <div className="request-images">
                                                    <h3>Aktuelle Fahrzeugbilder</h3>

                                                    <div className="request-images-grid">
                                                        {request.images.map(
                                                            (image, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={`http://localhost:5000${image}`}
                                                                    alt={`${request.brandModel} – Bild ${index + 1}`}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <form
                                                className="request-edit-form"
                                                onSubmit={handleUpdate}
                                            >
                                                <label>
                                                    Fahrzeugtyp
                                                    <input
                                                        type="text"
                                                        value={editingRequest.vehicleType || ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                vehicleType: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Fahrzeugtyp"
                                                    />
                                                </label>

                                                <label>
                                                    Marke / Modell
                                                    <input
                                                        type="text"
                                                        value={editingRequest.brandModel || ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                brandModel: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Marke / Modell"
                                                        required
                                                    />
                                                </label>

                                                <label>
                                                    Baujahr
                                                    <input
                                                        type="number"
                                                        value={editingRequest.year ?? ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                year: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Baujahr"
                                                    />
                                                </label>

                                                <label>
                                                    Kilometerstand
                                                    <input
                                                        type="number"
                                                        value={editingRequest.mileage ?? ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                mileage: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Kilometerstand"
                                                    />
                                                </label>

                                                <label>
                                                    Gewünschter Preis (€)
                                                    <input
                                                        type="number"
                                                        value={editingRequest.desiredPrice ?? ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                desiredPrice: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Gewünschter Preis"
                                                    />
                                                </label>

                                                <label>
                                                    Telefonnummer
                                                    <input
                                                        type="tel"
                                                        value={editingRequest.phone || ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                phone: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Telefonnummer"
                                                        required
                                                    />
                                                </label>

                                                <label>
                                                    E-Mail-Adresse
                                                    <input
                                                        type="email"
                                                        value={editingRequest.email || ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                email: e.target.value,
                                                            })
                                                        }
                                                        placeholder="E-Mail-Adresse"
                                                        required
                                                    />
                                                </label>

                                                <label className="request-textarea-label">
                                                    Zusätzliche Informationen (optional)
                                                    <textarea
                                                        value={editingRequest.additionalInfo || ""}
                                                        onChange={(e) =>
                                                            setEditingRequest({
                                                                ...editingRequest,
                                                                additionalInfo: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Weitere Informationen zu Ihrem Fahrzeug"
                                                        rows={4}
                                                    />
                                                </label>

                                                <label className="request-file-label">
                                                    Neue Bilder hinzufügen
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            setEditImages(
                                                                Array.from(e.target.files || [])
                                                            )
                                                        }
                                                    />
                                                </label>

                                                {editImages.length > 0 && (
                                                    <p className="request-selected-files">
                                                        {editImages.length} neue Bild(er) ausgewählt
                                                    </p>
                                                )}

                                                <div className="request-actions">
                                                    <button
                                                        type="submit"
                                                        className="request-edit-button"
                                                    >
                                                        Änderungen speichern
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="request-delete-button"
                                                        onClick={cancelEditing}
                                                    >
                                                        Abbrechen
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <div className="request-card-header">
                                                <div>
                                                    <span className="request-eyebrow">
                                                        FAHRZEUGANFRAGE
                                                    </span>
                                                    <h2>{request.brandModel}</h2>
                                                </div>

                                                <span className="request-status">
                                                    {request.status}
                                                </span>
                                            </div>

                                            <div className="request-specs">
                                                <div className="request-spec">
                                                    <span>Fahrzeugtyp</span>
                                                    <strong>
                                                        {request.vehicleType || "Keine Angabe"}
                                                    </strong>
                                                </div>

                                                <div className="request-spec">
                                                    <span>Baujahr</span>
                                                    <strong>
                                                        {request.year || "Keine Angabe"}
                                                    </strong>
                                                </div>

                                                <div className="request-spec">
                                                    <span>Kilometerstand</span>
                                                    <strong>
                                                        {request.mileage !== "" &&
                                                        request.mileage != null
                                                            ? `${Number(request.mileage).toLocaleString("de-DE")} km`
                                                            : "Keine Angabe"}
                                                    </strong>
                                                </div>

                                                <div className="request-spec request-price">
                                                    <span>Gewünschter Preis</span>
                                                    <strong>
                                                        {request.desiredPrice !== "" &&
                                                        request.desiredPrice != null
                                                            ? `${Number(request.desiredPrice).toLocaleString("de-DE")} €`
                                                            : "Kein Preis angegeben"}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="request-contact">
                                                <h3>Kontaktdaten</h3>
                                                <p>
                                                    <span>Telefon</span>
                                                    {request.phone}
                                                </p>
                                                <p>
                                                    <span>E-Mail</span>
                                                    {request.email}
                                                </p>
                                            </div>

                                            {request.additionalInfo && (
                                                <div className="request-description">
                                                    <h3>Zusätzliche Informationen</h3>
                                                    <p>{request.additionalInfo}</p>
                                                </div>
                                            )}

                                            <div className="request-actions">
                                                <button
                                                    type="button"
                                                    className="request-edit-button"
                                                    onClick={() => startEditing(request)}
                                                >
                                                    Bearbeiten
                                                </button>

                                                <button
                                                    type="button"
                                                    className="request-delete-button"
                                                    onClick={() => handleDelete(request._id)}
                                                >
                                                    Löschen
                                                </button>
                                            </div>

                                            {request.images?.length > 0 && (
                                                <div className="request-images">
                                                    <h3>Fahrzeugbilder</h3>

                                                    <div className="request-images-grid">
                                                        {request.images.map(
                                                            (image, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={`http://localhost:5000${image}`}
                                                                    alt={`${request.brandModel} – Bild ${index + 1}`}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default MeineAnfragen;