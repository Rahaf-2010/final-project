import {useState, useEffect} from "react";
import api from "../services/api";

function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState("");
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/reviews/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReviews(response.data);
            } catch (error) {
                console.error("Fehler beim Laden der Bewertungen:", error);
                setMessage(error.response?.data?.message || "Fehler beim Laden der Bewertungen.");
            }
        };
        fetchReviews();
    }, []);

    const handleReplyUpdate = async (e) => {
    e.preventDefault();
    try {
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
            });
        setReviews((prev) =>
            prev.map((review) =>
                review._id === editingReview._id
                    ? response.data.review
                    : review
            ));
        setEditingReview(null);

        setMessage(response.data.message || "Antwort erfolgreich gespeichert.");
    } catch (error) {
        console.error("Fehler beim Speichern der Antwort:", error);
        setMessage(
            error.response?.data?.message || "Die Antwort konnte nicht gespeichert werden."
        );
    }
};

    const handleDeleteReply = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.delete(
            `/reviews/admin/${id}/reply`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        setReviews((prev) =>
            prev.map((review) =>
                review._id === id
                    ? { ...review, adminReply: "" }
                    : review
            ));

        setMessage(response.data.message || "Antwort erfolgreich gelöscht.");
    } catch (error) {
        console.error("Fehler beim Löschen der Antwort:", error);
        setMessage(
            error.response?.data?.message ||
            "Die Antwort konnte nicht gelöscht werden."
        );
    }
};

    const handleDelete = async (id) => {
        try{
            const token = localStorage.getItem("token");
            const response = await api.delete(`/reviews/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews((prev) => prev.filter((review) => review._id !== id));
            setMessage(response.data.message || "Bewertung wurde erfolgreich gelöscht.");
        } catch (error) {
            console.error("Fehler beim Löschen der Bewertung:", error);
            setMessage(error.response?.data?.message || "Die Bewertung konnte nicht gelöscht werden.");
        }
    };


    return (
        <div>
            <h1>Bewertungen</h1>

            {message && <p>{message}</p>}
            {reviews.length === 0 ? (
                <p>Keine Bewertungen vorhanden.</p>
            ) : (
                <div>
                    {reviews.map((review) => (
                    <div key={review._id}>
                        <h2>{review.user?.name}
                            {review.user?.surname}
                        </h2>
                        <p>Bewertung: {"★".repeat(review.rating)}</p>
                        <p>{review.message}</p>

                        {review.adminReply && (
                            <p><strong>Antwort von ISSA Automobile:</strong> {review.adminReply}</p>)}
                        
                        <button
                            type="button"
                            onClick={() =>
                                setEditingReview({
                                    _id: review._id,
                                    adminReply: review.adminReply || "",
                                })
                            }
                        >
                            {review.adminReply ? "Antwort bearbeiten" : "Antworten"}
                        </button>

                        {review.adminReply && (
                        <button
                            type="button"
                            onClick={() => handleDeleteReply(review._id)}
                        >
                            Antwort löschen
                        </button>
                        )}

                        <button
                            type="button"
                            onClick={() => handleDelete(review._id)}
                        >
                            Löschen
                        </button>
                    </div>
                    ))}
                </div>
            )}
            {editingReview && (
                        <form onSubmit={handleReplyUpdate}>
                            <h2>
                                {editingReview.adminReply
                                    ? "Antwort bearbeiten"
                                    : "Auf Bewertung antworten"}
                            </h2>

                            <label>Antwort von ISSA Automobile:</label>

                            <textarea
                                value={editingReview.adminReply}
                                onChange={(e) =>
                                    setEditingReview({
                                        ...editingReview,
                                        adminReply: e.target.value,
                                    })
                                }
                                placeholder="Ihre Antwort hier..."
                                rows={4}
                            />

                            <button type="submit">
                                Antwort speichern
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditingReview(null)}
                            >
                                Abbrechen
                            </button>
                        </form>
                    )}
        </div>
    );
}


export default AdminReviews;