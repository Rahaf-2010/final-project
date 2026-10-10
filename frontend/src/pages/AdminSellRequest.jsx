import { useEffect, useState } from "react";
import {
    Check,
    Clock,
    X,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Phone,
    MapPin,
    UserRound,
    CarFront,
    CalendarDays,
    Gauge,
    Euro,
    Image as ImageIcon,
} from "lucide-react";

import api from "../services/api";
import "./AdminSellRequest.css";

const API_BASE = "http://localhost:5000";

function AdminSellRequest() {
    const [sellRequests, setSellRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [lightbox, setLightbox] = useState(null);

    // Load requests
    useEffect(() => {
        let cancelled = false;

        const fetchSellRequests = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/sell-requests/admin",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!cancelled) {
                    setSellRequests(response.data);
                }
            } catch (error) {
                console.error(
                    "Fehler beim Laden der Verkaufsanfragen:",
                    error
                );

                if (!cancelled) {
                    setMessage(
                        error.response?.data?.message ||
                        "Die Verkaufsanfragen konnten nicht geladen werden."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchSellRequests();

        return () => {
            cancelled = true;
        };
    }, []);

    // Change request status
    const handleStatusChange = async (id, status) => {
        try {
            setUpdatingId(id);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await api.put(
                `/sell-requests/admin/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSellRequests((previous) =>
                previous.map((request) =>
                    request._id === id
                        ? {
                            ...request,
                            status:
                            response.data.request.status,
                            }
                        : request
                )
            );

            setMessage(
                "Der Status wurde erfolgreich aktualisiert."
            );
        } catch (error) {
            console.error(
                "Fehler beim Aktualisieren des Status:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Der Status konnte nicht aktualisiert werden."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // Delete request
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Möchten Sie diese Verkaufsanfrage wirklich löschen?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await api.delete(
                `/sell-requests/admin/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSellRequests((previous) =>
                previous.filter(
                    (request) => request._id !== id
                )
            );

            setLightbox((previous) =>
                previous?.requestId === id ? null : previous
            );

            setMessage(
                response.data.message ||
                "Die Verkaufsanfrage wurde erfolgreich gelöscht."
            );
        } catch (error) {
            console.error(
                "Fehler beim Löschen der Anfrage:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Die Verkaufsanfrage konnte nicht gelöscht werden."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // Image helpers
    const getImageUrl = (image) => {
        if (!image) return "";

        if (image.startsWith("http")) {
            return image;
        }

        return `${API_BASE}${image}`;
    };

    const openLightbox = (request, index) => {
        setLightbox({
            requestId: request._id,
            index,
        });
    };

    const moveLightbox = (direction) => {
        setLightbox((previous) => {
            if (!previous) return null;

            const request = sellRequests.find(
                (item) => item._id === previous.requestId
            );

            if (!request?.images?.length) {
                return null;
            }

            const imageCount = request.images.length;

            return {
                ...previous,
                index:
                    (previous.index + direction + imageCount) %
                    imageCount,
            };
        });
    };

    // Keyboard controls for the image viewer
    useEffect(() => {
        if (!lightbox) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setLightbox(null);
                return;
            }

            if (
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
            ) {
                return;
            }

            const request = sellRequests.find(
                (item) => item._id === lightbox.requestId
            );

            if (!request?.images?.length) return;

            const direction =
                event.key === "ArrowLeft" ? -1 : 1;

            const imageCount = request.images.length;

            setLightbox((previous) => {
                if (!previous) return null;

                return {
                    ...previous,
                    index:
                        (previous.index + direction + imageCount) %
                        imageCount,
                };
            });
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [lightbox, sellRequests]);

    const formatNumber = (value) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "–";
        }

        const number = Number(value);

        return Number.isFinite(number)
            ? number.toLocaleString("de-DE")
            : value;
    };

    const getStatusClass = (status) => {
        if (status === "Angenommen") return "accepted";
        if (status === "Abgelehnt") return "rejected";

        return "processing";
    };

    const selectedRequest = lightbox
        ? sellRequests.find(
                (request) =>
                request._id === lightbox.requestId
            )
        : null;

    const selectedImages = selectedRequest?.images || [];

    return (
        <main className="admin-sell-page">
            <header className="admin-sell-header">


                <div className="admin-sell-header-text">
                    <span className="admin-sell-eyebrow">
                        ISSA AUTOMOBILE
                    </span>

                    <h1>Verkaufsanfragen</h1>

                    <p>
                        Eingegangene Fahrzeuganfragen verwalten
                        und bearbeiten.
                    </p>
                </div>

                <div className="admin-sell-total">
                    <span>Anfragen gesamt</span>
                    <strong>{sellRequests.length}</strong>
                </div>
            </header>

            {message && (
                <div
                    className="admin-sell-message"
                    role="status"
                >
                    {message}
                </div>
            )}

            {loading ? (
                <div className="admin-sell-state">
                    Anfragen werden geladen …
                </div>
            ) : sellRequests.length === 0 ? (
                <div className="admin-sell-state admin-sell-empty">
                    <CarFront size={42} />

                    <h2>Keine Verkaufsanfragen</h2>

                    <p>
                        Zurzeit liegen keine Anfragen vor.
                    </p>
                </div>
            ) : (
                <section className="admin-sell-list">
                    {sellRequests.map((request) => {
                        const user = request.user || {};
                        const images = request.images || [];

                        const status =
                            request.status || "In Bearbeitung";

                        const statusClass =
                            getStatusClass(status);

                        const isUpdating =
                            updatingId === request._id;

                        const isDeleting =
                            deletingId === request._id;

                        return (
                            <article
                                className="admin-sell-card"
                                key={request._id}
                            >
                                {/* Card header */}
                                <div className="admin-sell-card-header">
                                    <div>
                                        <span className="admin-sell-card-label">
                                            FAHRZEUGANFRAGE
                                        </span>

                                        <h2>
                                            {request.brandModel ||
                                                "Fahrzeug"}
                                        </h2>

                                        <p className="admin-sell-card-type">
                                            {request.vehicleType ||
                                                "Fahrzeugtyp nicht angegeben"}
                                        </p>
                                    </div>

                                    <span
                                        className={`admin-sell-status ${statusClass}`}
                                    >
                                        <span className="admin-sell-status-dot" />
                                        {status}
                                    </span>
                                </div>

                                {/* Customer information */}
                                <section className="admin-sell-section">
                                    <h3>
                                        <UserRound size={17} />
                                        Kundendaten
                                    </h3>

                                    <div className="admin-sell-info-grid">
                                        <div className="admin-sell-info">
                                            <span>Name</span>
                                            <strong>
                                                {[
                                                    user.name,
                                                    user.surname,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ") || "–"}
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info">
                                            <span>E-Mail</span>
                                            <strong className="admin-sell-break">
                                                {user.email || "–"}
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info">
                                            <span>
                                                <Phone size={14} />
                                                Telefon
                                            </span>
                                            <strong>
                                                {user.phone || "–"}
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info">
                                            <span>
                                                <MapPin size={14} />
                                                Adresse
                                            </span>
                                            <strong className="admin-sell-break">
                                                {user.adress || "–"}
                                            </strong>
                                        </div>
                                    </div>
                                </section>

                                {/* Vehicle information */}
                                <section className="admin-sell-section">
                                    <h3>
                                        <CarFront size={17} />
                                        Fahrzeugdaten
                                    </h3>

                                    <div className="admin-sell-info-grid">
                                        <div className="admin-sell-info">
                                            <span>Marke / Modell</span>
                                            <strong>
                                                {request.brandModel || "–"}
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info">
                                            <span>Fahrzeugtyp</span>
                                            <strong>
                                                {request.vehicleType || "–"}
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info">
                                            <span>
                                                <CalendarDays size={14} />
                                                Baujahr
                                            </span>
                                            <strong>
                                                {request.year || "–"}
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info">
                                            <span>
                                                <Gauge size={14} />
                                                Kilometerstand
                                            </span>
                                            <strong>
                                                {formatNumber(
                                                    request.mileage
                                                )}{" "}
                                                km
                                            </strong>
                                        </div>

                                        <div className="admin-sell-info admin-sell-price">
                                            <span>
                                                <Euro size={14} />
                                                Gewünschter Preis
                                            </span>
                                            <strong>
                                                {formatNumber(
                                                    request.desiredPrice
                                                )}{" "}
                                                €
                                            </strong>
                                        </div>
                                    </div>
                                </section>

                                {/* Additional information */}
                                {request.additionalInfo && (
                                    <section className="admin-sell-section">
                                        <h3>
                                            Zusätzliche Informationen
                                        </h3>

                                        <p className="admin-sell-description">
                                            {request.additionalInfo}
                                        </p>
                                    </section>
                                )}

                                {/* Images */}
                                <section className="admin-sell-section">
                                    <h3>
                                        <ImageIcon size={17} />
                                        Fahrzeugbilder

                                        <span className="admin-sell-image-count">
                                            {images.length}
                                        </span>
                                    </h3>

                                    {images.length > 0 ? (
                                        <div className="admin-sell-gallery">
                                            {images.map(
                                                (image, index) => (
                                                    <button
                                                        type="button"
                                                        className="admin-sell-thumbnail"
                                                        key={`${image}-${index}`}
                                                        onClick={() =>
                                                            openLightbox(
                                                                request,
                                                                index
                                                            )
                                                        }
                                                        aria-label={`Bild ${index + 1} vergrößern`}
                                                    >
                                                        <img
                                                            src={getImageUrl(
                                                                image
                                                            )}
                                                            alt={`${request.brandModel || "Fahrzeug"} – Bild ${index + 1}`}
                                                            loading="lazy"
                                                        />

                                                        <span>
                                                            <ImageIcon
                                                                size={17}
                                                            />
                                                        </span>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="admin-sell-no-images">
                                            Keine Bilder vorhanden.
                                        </p>
                                    )}
                                </section>

                                {/* Actions */}
                                <section className="admin-sell-actions-section">
                                    <h3>Bearbeitungsstatus</h3>

                                    <div className="admin-sell-actions">
                                        <button
                                            type="button"
                                            className="admin-sell-action processing-button"
                                            disabled={
                                                isUpdating || isDeleting
                                            }
                                            onClick={() =>
                                                handleStatusChange(
                                                    request._id,
                                                    "In Bearbeitung"
                                                )
                                            }
                                        >
                                            <Clock size={16} />
                                            In Bearbeitung
                                        </button>

                                        <button
                                            type="button"
                                            className="admin-sell-action accepted-button"
                                            disabled={
                                                isUpdating || isDeleting
                                            }
                                            onClick={() =>
                                                handleStatusChange(
                                                    request._id,
                                                    "Angenommen"
                                                )
                                            }
                                        >
                                            <Check size={16} />
                                            Angenommen
                                        </button>

                                        <button
                                            type="button"
                                            className="admin-sell-action rejected-button"
                                            disabled={
                                                isUpdating || isDeleting
                                            }
                                            onClick={() =>
                                                handleStatusChange(
                                                    request._id,
                                                    "Abgelehnt"
                                                )
                                            }
                                        >
                                            <X size={16} />
                                            Abgelehnt
                                        </button>

                                        <button
                                            type="button"
                                            className="admin-sell-action delete-button"
                                            disabled={
                                                isDeleting || isUpdating
                                            }
                                            onClick={() =>
                                                handleDelete(request._id)
                                            }
                                        >
                                            <Trash2 size={16} />
                                            {isDeleting
                                                ? "Wird gelöscht …"
                                                : "Löschen"}
                                        </button>
                                    </div>

                                    {isUpdating && (
                                        <p className="admin-sell-action-hint">
                                            Status wird aktualisiert …
                                        </p>
                                    )}
                                </section>
                            </article>
                        );
                    })}
                </section>
            )}

            {/* Full-screen image viewer */}
            {lightbox &&
                selectedRequest &&
                selectedImages.length > 0 && (
                    <div
                        className="admin-sell-lightbox"
                        onClick={() => setLightbox(null)}
                    >
                        <button
                            type="button"
                            className="admin-sell-lightbox-close"
                            onClick={() => setLightbox(null)}
                            aria-label="Bild schließen"
                        >
                            <X size={25} />
                        </button>

                        {selectedImages.length > 1 && (
                            <button
                                type="button"
                                className="admin-sell-lightbox-arrow prev"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    moveLightbox(-1);
                                }}
                                aria-label="Vorheriges Bild"
                            >
                                <ChevronLeft size={30} />
                            </button>
                        )}

                        <div
                            className="admin-sell-lightbox-content"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >
                            <img
                                src={getImageUrl(
                                    selectedImages[lightbox.index]
                                )}
                                alt={`${selectedRequest.brandModel || "Fahrzeug"} – Bild ${lightbox.index + 1}`}
                            />

                            <p>
                                {selectedRequest.brandModel || "Fahrzeug"}
                                {" · Bild "}
                                {lightbox.index + 1}
                                {" von "}
                                {selectedImages.length}
                            </p>
                        </div>

                        {selectedImages.length > 1 && (
                            <button
                                type="button"
                                className="admin-sell-lightbox-arrow next"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    moveLightbox(1);
                                }}
                                aria-label="Nächstes Bild"
                            >
                                <ChevronRight size={30} />
                            </button>
                        )}
                    </div>
                )}
        </main>
    );
}

export default AdminSellRequest;