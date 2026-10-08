import {useState, useEffect} from "react";
import api from "../services/api";


const AboutUs = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [currentUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get("/reviews");
                setReviews(response.data);
            } catch (error) {
                console.error("Fehler beim Laden der Bewertungen.", error.response);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0 || !message.trim()) {
            setReviewMessage("Bitte geben Sie eine Bewertung und eine Nachricht ein.");
            return;
        }
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/reviews",
                { rating, message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setReviewMessage(response.data.message || "Vielen Dank für Ihre Bewertung!");
            setRating(0);
            setMessage("");

            const reviewResponse = await api.get("/reviews");
            setReviews(reviewResponse.data);

        } catch (error) {
            console.error("Fehler beim Absenden der Bewertung.", error.response);

            setReviewMessage(error.response?.data?.message || "Fehler beim Absenden der Bewertung.");
        }
    };

    const handleUpdateReview = async(e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            const response = await api.put(
                `/reviews/${editingReview._id}`,
                { rating:editingReview.rating, message: editingReview.message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setReviews((prev) =>
                prev.map((review) =>
                    review._id === editingReview._id ? { ...review, ...response.data.review } : review
                )
            );
            setEditingReview(null);
            setReviewMessage("Ihre Bewertung wurde erfolgreich aktualisiert!");
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Bewertung.", error.response);
            setReviewMessage(error.response?.data?.message || "Fehler beim Aktualisieren der Bewertung.");
        }
    };

    const handleDeleteReview = async (id) => {
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

        setReviewMessage(
            response.data.message || "Bewertung erfolgreich gelöscht."
        );
    } catch (error) {
        console.error("Fehler beim Löschen der Bewertung:", error);

        setReviewMessage(
            error.response?.data?.message ||
            "Die Bewertung konnte nicht gelöscht werden."
        );
    }
};

    return (
        <div>
            <h1>Willkommen bei ISSA Automobile!</h1>

            <p>ISSA Automobile ist Ihr zuverlässiger Partner für den Kauf und Verkauf von Gebrauchtfahrzeugen.</p>

                <h2>Unsere Dienstleistungen</h2>

            <div>
                
                <div>
                    <div>
                        <h3>Ankauf und Verkauf</h3>
                        <p>Wir kaufen und verkaufen Gebrauchtfahrzeuge aller Art</p>
                    </div>

                    <div>
                        <h3>Umfassende Fahrzeugprüfung</h3>
                        <p>Jedes Fahrzeug wird sorgfältig und umfassend geprüft</p>
                    </div>

                    <div>
                        <h3>Kostenlose Probefahrt</h3>
                        <p>Bei Interesse können Sie eine kostenlose Probefahrt vereinbaren</p>
                    </div>

                    <div>
                        <h3>Kostenlose Abholung</h3>
                        <p>Wir bieten eine kostenlose Abholung Ihres Fahrzeugs an</p>
                    </div>

                    <div>
                        <h2>Kontaktieren Sie uns</h2>
                        <p>Telefon: 01234-567890</p>
                        <p>Email: info@issa-automobile.de</p>
                        <p>Adresse: Musterstraße 1, 12345 Musterstadt</p>
                    </div>

                    <div>
                        <h2>Ihre Meinung ist uns wichtig</h2>

                        <p>
                            Mit Ihrem Feedback helfen Sie uns, unseren Service,unsere Leistungen kontinuierlich zu verbessern.
                            Haben Sie eine Beschwerde oder einen Verbesserungsvorschlag?
                            Wir freuen uns auf Ihr Feedback!
                        </p>
                        <div>
                            <h3>Ihre Bewertung</h3> 

                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
                                    >
                                        {star <= rating ? "★" : "☆"}
                                    </button>
                                ))}
                            </div>
                            
                            <textarea
                                name="message"
                                placeholder="Ihre Bewertung, Beschwerde oder Verbesserungsvorschlag"
                                rows="5"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <br/>
                            <button type="button" onClick={handleSubmit}>Absenden</button>
                            {reviewMessage && <p>{reviewMessage}</p>}

                            <h3>Bewertungen unserer Kunden</h3>

                            {reviews.length === 0 ? (
                                <p>Keine Bewertungen vorhanden.</p>
                            ) : (
                                <ul>
                                    {reviews.map((review) => (
                                        <div key={review.id}>
                                            <h4>{review.user?.name} {review.user?.surname}</h4>

                                            <p>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                                            <p>{review.message}</p>

                                            {String(currentUser?._id || currentUser?.id) === String(review.user?._id) && (
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingReview({
                                                            _id: review._id,
                                                            rating: review.rating,
                                                            message: review.message,
                                                        })}
                                                    >
                                                        Bearbeiten
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteReview(review._id)}
                                                    >
                                                        Löschen
                                                    </button>
                                                </div>
                                            )}

                                            {review.adminReply && (
                                                <div>
                                                <strong>ISSA Automobile:</strong>
                                                <p>{review.adminReply}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </ul>
                            )}
                                {editingReview && (
                                    <form onSubmit={handleUpdateReview}>
                                        <h3>Bewertung bearbeiten</h3>

                                        <label>Bewertung:</label>

                                        <select
                                            value={editingReview.rating}
                                            onChange={(e) =>
                                                setEditingReview({
                                                    ...editingReview,
                                                    rating: Number(e.target.value),
                                                })
                                            }
                                        >
                                            <option value={1}>1 Stern</option>
                                            <option value={2}>2 Sterne</option>
                                            <option value={3}>3 Sterne</option>
                                            <option value={4}>4 Sterne</option>
                                            <option value={5}>5 Sterne</option>
                                        </select>

                                        <label>Kommentar:</label>

                                        <textarea
                                            value={editingReview.message}
                                            onChange={(e) =>
                                                setEditingReview({
                                                    ...editingReview,
                                                    message: e.target.value,
                                                })
                                            }
                                            rows="4"
                                        />

                                        <button type="submit">
                                            Änderungen speichern
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
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs