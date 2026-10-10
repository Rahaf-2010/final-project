import { useState, useEffect } from "react";
import {
    Star,
    Trash2,
    Pencil,
    X,
    Send,
    MessageCircle,
} from "lucide-react";

import api from "../services/api";
import "./AdminReviews.css";

function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState("");
    const [editingReview, setEditingReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/reviews/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!cancelled) {
                    setReviews(response.data);
                }
            } catch (error) {
                console.error(
                    "Fehler beim Laden der Bewertungen:",
                    error
                );

                if (!cancelled) {
                    setMessage(
                        error.response?.data?.message ||
                        "Die Bewertungen konnten nicht geladen werden."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchReviews();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleReplyUpdate = async (e) => {
        e.preventDefault();

        if (!editingReview || saving) return;

        try {
            setSaving(true);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await api.put(
                `/reviews/admin/${editingReview._id}/reply`,
                {
                    adminReply: editingReview.adminReply,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReviews((previous) =>
                previous.map((review) =>
                    review._id === editingReview._id
                        ? response.data.review
                        : review
                )
            );

            setEditingReview(null);

            setMessage(
                response.data.message ||
                "Antwort erfolgreich gespeichert."
            );
        } catch (error) {
            console.error(
                "Fehler beim Speichern der Antwort:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Die Antwort konnte nicht gespeichert werden."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteReply = async (id) => {
        if (
            !window.confirm(
                "Möchten Sie die Antwort wirklich löschen?"
            )
        ) {
            return;
        }

        try {
            setDeletingId(id);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await api.delete(
                `/reviews/admin/${id}/reply`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReviews((previous) =>
                previous.map((review) =>
                    review._id === id
                        ? { ...review, adminReply: "" }
                        : review
                )
            );

            setMessage(
                response.data.message ||
                "Antwort erfolgreich gelöscht."
            );
        } catch (error) {
            console.error(
                "Fehler beim Löschen der Antwort:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Die Antwort konnte nicht gelöscht werden."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Möchten Sie diese Bewertung wirklich löschen?"
            )
        ) {
            return;
        }

        try {
            setDeletingId(id);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await api.delete(
                `/reviews/admin/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReviews((previous) =>
                previous.filter((review) => review._id !== id)
            );

            if (editingReview?._id === id) {
                setEditingReview(null);
            }

            setMessage(
                response.data.message ||
                "Bewertung erfolgreich gelöscht."
            );
        } catch (error) {
            console.error(
                "Fehler beim Löschen der Bewertung:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Die Bewertung konnte nicht gelöscht werden."
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="admin-reviews-page">
            <header className="admin-reviews-header">

                <div>
                    <span className="admin-reviews-eyebrow">
                        ISSA AUTOMOBILE
                    </span>

                    <h1>Bewertungen</h1>

                    <p>
                        Kundenfeedback lesen und professionell beantworten.
                    </p>
                </div>

                <div className="admin-reviews-counter">
                    <span>Bewertungen</span>
                    <strong>{reviews.length}</strong>
                </div>
            </header>

            {message && (
                <div
                    className="admin-reviews-message"
                    role="status"
                >
                    {message}
                </div>
            )}

            {loading ? (
                <div className="admin-reviews-state">
                    Bewertungen werden geladen …
                </div>
            ) : reviews.length === 0 ? (
                <div className="admin-reviews-state admin-reviews-empty">
                    <MessageCircle size={38} />
                    <h2>Keine Bewertungen vorhanden</h2>
                    <p>
                        Sobald Kunden eine Bewertung schreiben,
                        erscheint sie hier.
                    </p>
                </div>
            ) : (
                <section className="admin-reviews-list">
                    {reviews.map((review) => {
                        const userName = [
                            review.user?.name,
                            review.user?.surname,
                        ]
                            .filter(Boolean)
                            .join(" ");

                        const rating = Math.max(
                            0,
                            Math.min(5, Number(review.rating) || 0)
                        );

                        const isDeleting =
                            deletingId === review._id;

                        return (
                            <article
                                className="admin-review-card"
                                key={review._id}
                            >
                                <div className="admin-review-top">
                                    <div className="admin-review-avatar">
                                        {(
                                            userName || "K"
                                        )
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="admin-review-user">
                                        <h2>
                                            {userName || "Kunde"}
                                        </h2>

                                        {review.user?.email && (
                                            <p>
                                                {review.user.email}
                                            </p>
                                        )}
                                    </div>

                                    <span className="admin-review-label">
                                        Kundenbewertung
                                    </span>
                                </div>

                                <div
                                    className="admin-review-stars"
                                    aria-label={`${rating} von 5 Sternen`}
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={21}
                                            fill={
                                                star <= rating
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            strokeWidth={1.7}
                                            className={
                                                star <= rating
                                                    ? "is-filled"
                                                    : "is-empty"
                                            }
                                        />
                                    ))}

                                    <span>
                                        {rating}/5
                                    </span>
                                </div>

                                <div className="admin-review-message">
                                    <span className="admin-review-section-label">
                                        Kundenkommentar
                                    </span>

                                    <p>
                                        {review.message ||
                                            "Kein Kommentar vorhanden."}
                                    </p>
                                </div>

                                {review.adminReply && (
                                    <div className="admin-review-reply">
                                        <div className="admin-review-reply-heading">
                                            <MessageCircle size={17} />
                                            <strong>
                                                Antwort von ISSA Automobile
                                            </strong>
                                        </div>

                                        <p>{review.adminReply}</p>

                                        <button
                                            type="button"
                                            className="admin-review-button admin-review-button-outline"
                                            disabled={isDeleting}
                                            onClick={() =>
                                                handleDeleteReply(
                                                    review._id
                                                )
                                            }
                                        >
                                            <Trash2 size={15} />
                                            Antwort löschen
                                        </button>
                                    </div>
                                )}

                                <div className="admin-review-actions">
                                    <button
                                        type="button"
                                        className="admin-review-button admin-review-button-primary"
                                        disabled={isDeleting}
                                        onClick={() =>
                                            setEditingReview({
                                                _id: review._id,
                                                adminReply:
                                                    review.adminReply || "",
                                            })
                                        }
                                    >
                                        <Pencil size={16} />

                                        {review.adminReply
                                            ? "Antwort bearbeiten"
                                            : "Antworten"}
                                    </button>

                                    <button
                                        type="button"
                                        className="admin-review-button admin-review-button-outline"
                                        disabled={isDeleting}
                                        onClick={() =>
                                            handleDelete(review._id)
                                        }
                                    >
                                        <Trash2 size={16} />
                                        {isDeleting
                                            ? "Wird gelöscht …"
                                            : "Löschen"}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </section>
            )}

            {editingReview && (
                <div
                    className="admin-review-modal-backdrop"
                    onClick={() => {
                        if (!saving) setEditingReview(null);
                    }}
                >
                    <section
                        className="admin-review-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="admin-review-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="admin-review-modal-header">
                            <div>
                                <span className="admin-reviews-eyebrow">
                                    ISSA AUTOMOBILE
                                </span>

                                <h2 id="admin-review-modal-title">
                                    {editingReview.adminReply
                                        ? "Antwort bearbeiten"
                                        : "Auf Bewertung antworten"}
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="admin-review-modal-close"
                                disabled={saving}
                                onClick={() =>
                                    setEditingReview(null)
                                }
                                aria-label="Schließen"
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <form onSubmit={handleReplyUpdate}>
                            <label htmlFor="admin-review-reply-input">
                                Ihre Antwort
                            </label>

                            <textarea
                                id="admin-review-reply-input"
                                value={editingReview.adminReply}
                                onChange={(e) =>
                                    setEditingReview((previous) => ({
                                        ...previous,
                                        adminReply: e.target.value,
                                    }))
                                }
                                placeholder="Schreiben Sie eine professionelle Antwort …"
                                rows={5}
                                required
                            />

                            <div className="admin-review-modal-actions">
                                <button
                                    type="button"
                                    className="admin-review-button admin-review-button-outline"
                                    disabled={saving}
                                    onClick={() =>
                                        setEditingReview(null)
                                    }
                                >
                                    Abbrechen
                                </button>

                                <button
                                    type="submit"
                                    className="admin-review-button admin-review-button-primary"
                                    disabled={saving}
                                >
                                    <Send size={16} />
                                    {saving
                                        ? "Wird gespeichert …"
                                        : "Antwort speichern"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default AdminReviews;