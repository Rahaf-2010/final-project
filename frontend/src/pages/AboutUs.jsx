import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    CarFront,
    Handshake,
    BadgeCheck,
    MapPin,
    Phone,
    Mail,
    Star,
    MessageSquare,
    Pencil,
    Trash2,
    Send,
} from "lucide-react";
import api from "../services/api";
import "./AboutUs.css";

const AboutUs = () => {
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);

    const [currentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch {
            return null;
        }
    });

    const isLoggedIn = Boolean(localStorage.getItem("token"));

    useEffect(() => {
        let isMounted = true;

        const fetchReviews = async () => {
            try {
                const response = await api.get("/reviews");

                if (isMounted) {
                    setReviews(response.data);
                }
            } catch (error) {
                console.error(
                    "Fehler beim Laden der Bewertungen.",
                    error
                );
            }
        };

        fetchReviews();

        return () => {
            isMounted = false;
        };
    }, []);

    // Neue Bewertung absenden
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0 || !message.trim()) {
            setReviewMessage(
                "Bitte wählen Sie eine Sternebewertung und geben Sie einen Kommentar ein."
            );
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/reviews",
                {
                    rating,
                    message: message.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReviewMessage(
                response.data.message ||
                    "Vielen Dank für Ihre Bewertung!"
            );

            setRating(0);
            setMessage("");

            const reviewResponse = await api.get("/reviews");
            setReviews(reviewResponse.data);
        } catch (error) {
            setReviewMessage(
                error.response?.data?.message ||
                    "Die Bewertung konnte nicht gesendet werden."
            );
        }
    };

    // Bewertung innerhalb der Karte bearbeiten
    const handleUpdateReview = async (e) => {
        e.preventDefault();

        if (!editingReview?.message.trim()) {
            setReviewMessage(
                "Bitte geben Sie einen Kommentar ein."
            );
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.put(
                `/reviews/${editingReview._id}`,
                {
                    rating: editingReview.rating,
                    message: editingReview.message.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.review) {
                setReviews((prev) =>
                    prev.map((review) =>
                        review._id === editingReview._id
                            ? { ...review, ...response.data.review }
                            : review
                    )
                );
            } else {
                const reviewResponse = await api.get("/reviews");
                setReviews(reviewResponse.data);
            }

            setEditingReview(null);
            setReviewMessage(
                "Ihre Bewertung wurde erfolgreich aktualisiert!"
            );
        } catch (error) {
            setReviewMessage(
                error.response?.data?.message ||
                    "Die Bewertung konnte nicht aktualisiert werden."
            );
        }
    };

    // Eigene Bewertung löschen
    const handleDeleteReview = async (id) => {
        const confirmed = window.confirm(
            "Möchten Sie diese Bewertung wirklich löschen?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            const response = await api.delete(`/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setReviews((prev) =>
                prev.filter((review) => review._id !== id)
            );

            if (editingReview?._id === id) {
                setEditingReview(null);
            }

            setReviewMessage(
                response.data.message ||
                    "Bewertung erfolgreich gelöscht."
            );
        } catch (error) {
            setReviewMessage(
                error.response?.data?.message ||
                    "Die Bewertung konnte nicht gelöscht werden."
            );
        }
    };

    return (
        <main className="about-page">
            {/* Hero-Bereich */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <span className="about-eyebrow">
                        WILLKOMMEN BEI ISSA AUTOMOBILE
                    </span>

                    <h1>
                        Ihre nächste Fahrt.
                        <span> Unser gemeinsames Ziel.</span>
                    </h1>

                    <p>
                        Wir begleiten Sie persönlich und transparent beim
                        Kauf und Verkauf Ihres Gebrauchtwagens. Vertrauen,
                        Qualität und Ihre Zufriedenheit stehen bei uns an
                        erster Stelle.
                    </p>

                    <button
                        className="about-primary-button"
                        type="button"
                        onClick={() => navigate("/cars")}
                    >
                        Fahrzeuge entdecken <CarFront size={19} />
                    </button>
                </div>

                <div className="about-hero-decoration">
                    <div className="about-hero-icon">
                        <CarFront size={76} strokeWidth={1.1} />
                    </div>
                    <span>QUALITÄT · VERTRAUEN · SERVICE</span>
                </div>
            </section>

            {/* Über uns */}
            <section className="about-section about-intro">
                <span className="about-eyebrow">DAS SIND WIR</span>

                <h2>Automobilhandel mit persönlichem Anspruch</h2>

                <p>
                    Bei ISSA AUTOMOBILE stehen nicht nur Fahrzeuge im
                    Mittelpunkt, sondern vor allem die Menschen dahinter.
                    Wir möchten, dass Sie sich bei jedem Schritt gut beraten
                    und sicher fühlen – vom ersten Gespräch bis zur Übergabe.
                </p>
            </section>

            {/* Dienstleistungen */}
            <section className="about-section">
                <div className="about-section-heading">
                    <span className="about-eyebrow">
                        WAS WIR FÜR SIE TUN
                    </span>
                    <h2>Unser Service für Sie</h2>
                    <p>Persönlich, zuverlässig und unkompliziert.</p>
                </div>

                <div className="about-services-grid">
                    <article className="about-service-card">
                        <div className="about-service-icon">
                            <Handshake size={27} />
                        </div>
                        <h3>Ankauf und Verkauf</h3>
                        <p>
                            Wir unterstützen Sie beim Kauf und Verkauf
                            von Gebrauchtfahrzeugen.
                        </p>
                    </article>

                    <article className="about-service-card">
                        <div className="about-service-icon">
                            <ShieldCheck size={27} />
                        </div>
                        <h3>Sorgfältige Prüfung</h3>
                        <p>
                            Eine sorgfältige Fahrzeugprüfung unterstützt
                            Sie bei Ihrer Kaufentscheidung.
                        </p>
                    </article>

                    <article className="about-service-card">
                        <div className="about-service-icon">
                            <CarFront size={27} />
                        </div>
                        <h3>Kostenlose Probefahrt</h3>
                        <p>
                            Lernen Sie Ihr Wunschfahrzeug bei einer
                            kostenlosen Probefahrt kennen.
                        </p>
                    </article>

                    <article className="about-service-card">
                        <div className="about-service-icon">
                            <BadgeCheck size={27} />
                        </div>
                        <h3>Persönlicher Service</h3>
                        <p>
                            Wir nehmen uns Zeit für Ihre Fragen und
                            begleiten Sie persönlich.
                        </p>
                    </article>
                </div>
            </section>

            {/* Kontakt */}
            <section className="about-contact-section">
                <div className="about-contact-copy">
                    <span className="about-eyebrow">
                        WIR SIND FÜR SIE DA
                    </span>

                    <h2>Lernen Sie uns persönlich kennen.</h2>

                    <p>
                        Sie haben Fragen zu einem Fahrzeug oder möchten
                        Ihr Auto verkaufen? Wir freuen uns auf Ihre Nachricht.
                    </p>
                </div>

                <div className="about-contact-cards">
                    <div className="about-contact-card">
                        <MapPin size={23} />

                        <div>
                            <h3>Besuchen Sie uns</h3>
                            <p>
                                Schweinfurter Straße
                                <br />
                                Gegenüber der Walter Tankstelle
                                <br />
                                97437 Haßfurt
                            </p>
                        </div>
                    </div>

                    <div className="about-contact-card">
                        <Phone size={23} />

                        <div>
                            <h3>Telefon &amp; WhatsApp</h3>
                            <h4>Tel: +49 1573 1157818</h4>

                            <p>
                                Kontaktieren Sie uns telefonisch oder
                                per WhatsApp.
                            </p>

                            <a href="tel:+4915731157818">
                                Jetzt anrufen
                            </a>

                            <a
                                href="https://wa.me/4915731157818"
                                target="_blank"
                                rel="noreferrer"
                            >
                                WhatsApp öffnen
                            </a>
                        </div>
                    </div>

                    <div className="about-contact-card">
                        <Mail size={23} />

                        <div>
                            <h3>E-Mail</h3>
                            <p>
                                Wir freuen uns auf Ihre Nachricht.
                            </p>

                            <h4>
                                issaabdulautomobile@gmail.com
                            </h4>

                            <a href="mailto:issaabdulautomobile@gmail.com">
                                E-Mail schreiben
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bewertungen */}
            <section className="about-reviews-section">
                <div className="about-section-heading">
                    <span className="about-eyebrow">
                        IHRE STIMME ZÄHLT
                    </span>

                    <h2>Was unsere Kunden sagen</h2>

                    <p>
                        Ihr Feedback hilft uns, unseren Service
                        kontinuierlich zu verbessern.
                    </p>
                </div>

                <div className="about-review-form-card">
                    <div className="about-review-form-heading">
                        <MessageSquare size={25} />

                        <div>
                            <h3>Teilen Sie Ihre Erfahrung</h3>
                            <p>
                                Wir freuen uns über Ihre Rückmeldung.
                            </p>
                        </div>
                    </div>

                    {isLoggedIn ? (
                        <form
                            className="about-review-form"
                            onSubmit={handleSubmit}
                        >
                            <label>Ihre Sternebewertung</label>

                            <div className="about-star-picker">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        aria-label={`${star} Sterne`}
                                        onClick={() => setRating(star)}
                                        className={
                                            star <= rating ? "selected" : ""
                                        }
                                    >
                                        <Star
                                            size={29}
                                            fill={
                                                star <= rating
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            <label htmlFor="about-review-message">
                                Ihre Nachricht
                            </label>

                            <textarea
                                id="about-review-message"
                                placeholder="Wie war Ihre Erfahrung mit ISSA AUTOMOBILE?"
                                rows={5}
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                required
                            />

                            <button
                                className="about-primary-button"
                                type="submit"
                            >
                                Bewertung absenden <Send size={17} />
                            </button>
                        </form>
                    ) : (
                        <div className="about-login-prompt">
                            <p>
                                Bitte melden Sie sich an, um eine Bewertung
                                abzugeben.
                            </p>

                            <button
                                className="about-outline-button"
                                type="button"
                                onClick={() => navigate("/login")}
                            >
                                Jetzt anmelden
                            </button>
                        </div>
                    )}

                    {reviewMessage && (
                        <p
                            className="about-feedback-message"
                            role="status"
                        >
                            {reviewMessage}
                        </p>
                    )}
                </div>

                <div className="about-reviews-grid">
                    {reviews.length === 0 ? (
                        <p className="about-empty-reviews">
                            Noch keine Bewertungen vorhanden. Seien Sie die
                            erste Person, die ihre Erfahrung teilt.
                        </p>
                    ) : (
                        reviews.map((review) => {
                            const currentUserId =
                                currentUser?._id || currentUser?.id;

                            const reviewUserId =
                                review.user?._id || review.user?.id;

                            const isOwner =
                                currentUserId &&
                                String(currentUserId) ===
                                    String(reviewUserId);

                            return (
                                <article
                                    className="about-review-card"
                                    key={review._id}
                                >
                                    <div className="about-review-card-top">
                                        <div className="about-review-avatar">
                                            {(review.user?.name || "K")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="about-review-author">
                                            <h3>
                                                {review.user?.name || "Kunde"}{" "}
                                                {review.user?.surname || ""}
                                            </h3>
                                            <span>Kundenbewertung</span>
                                        </div>
                                    </div>

                                    <div
                                        className="about-review-stars"
                                        aria-label={`${review.rating} von 5 Sternen`}
                                    >
                                        {"★".repeat(review.rating)}
                                        <span>
                                            {"☆".repeat(
                                                5 - review.rating
                                            )}
                                        </span>
                                    </div>

                                    {editingReview?._id === review._id ? (
                                        <form
                                            className="about-inline-edit"
                                            onSubmit={handleUpdateReview}
                                        >
                                            <label>
                                                Sternebewertung
                                            </label>

                                            <select
                                                value={editingReview.rating}
                                                onChange={(e) =>
                                                    setEditingReview({
                                                        ...editingReview,
                                                        rating: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                            >
                                                <option value={1}>
                                                    1 Stern
                                                </option>
                                                <option value={2}>
                                                    2 Sterne
                                                </option>
                                                <option value={3}>
                                                    3 Sterne
                                                </option>
                                                <option value={4}>
                                                    4 Sterne
                                                </option>
                                                <option value={5}>
                                                    5 Sterne
                                                </option>
                                            </select>

                                            <label>Kommentar</label>

                                            <textarea
                                                rows={4}
                                                value={editingReview.message}
                                                onChange={(e) =>
                                                    setEditingReview({
                                                        ...editingReview,
                                                        message:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />

                                            <div className="about-edit-actions">
                                                <button
                                                    className="about-primary-button"
                                                    type="submit"
                                                >
                                                    Änderungen speichern
                                                </button>

                                                <button
                                                    className="about-outline-button"
                                                    type="button"
                                                    onClick={() =>
                                                        setEditingReview(null)
                                                    }
                                                >
                                                    Abbrechen
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p className="about-review-text">
                                            {review.message}
                                        </p>
                                    )}

                                    {review.adminReply && (
                                        <div className="about-admin-reply">
                                            <strong>
                                                Antwort von ISSA AUTOMOBILE
                                            </strong>
                                            <p>{review.adminReply}</p>
                                        </div>
                                    )}

                                    {isOwner && (
                                        <div className="about-review-actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditingReview({
                                                        _id: review._id,
                                                        rating: review.rating,
                                                        message: review.message,
                                                    })
                                                }
                                            >
                                                <Pencil size={15} />
                                                Bearbeiten
                                            </button>

                                            <button
                                                type="button"
                                                className="about-review-delete"
                                                onClick={() =>
                                                    handleDeleteReview(
                                                        review._id
                                                    )
                                                }
                                            >
                                                <Trash2 size={15} />
                                                Löschen
                                            </button>
                                        </div>
                                    )}
                                </article>
                            );
                        })
                    )}
                </div>
            </section>
        </main>
    );
};

export default AboutUs;