import {useState} from "react";
import api from "../services/api";


const AboutUs = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");

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
        } catch (error) {
            console.error("Fehler beim Absenden der Bewertung.", error.response);

            setReviewMessage(error.response?.data?.message || "Fehler beim Absenden der Bewertung.");
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
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs