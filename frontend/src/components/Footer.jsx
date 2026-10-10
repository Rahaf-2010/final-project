import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, ArrowUp, MessageCircle } from "lucide-react";
import "./Footer.css";

function Footer() {
    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="issa-footer">
            <div className="issa-footer-main">

                <div className="issa-footer-column">
                    <h3>Kontakt</h3>

                    {/* Telefonnummer */}
                    <a href="tel:+4915731157818">
                        <Phone size={17} />
                        <span>+49 1573 1157818</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/4915731157818"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageCircle size={17} />
                        <span>WhatsApp</span>
                    </a>

                    {/* E-Mail */}
                    <a href="mailto:info@issa-automobile.de">
                        <Mail size={17} />
                        <span>info@issa-automobile.de</span>
                    </a>
                </div>

                {/* Navigation */}
                <div className="issa-footer-column">
                    <h3>Navigation</h3>

                    <button onClick={() => goTo("/cars")}>Fahrzeuge</button>
                    <button onClick={() => goTo("/sell-request")}>
                        Fahrzeug verkaufen
                    </button>
                    <button onClick={() => goTo("/meine-anfragen")}>
                        Meine Anfragen
                    </button>
                    <button onClick={() => goTo("/about-us")}>Über uns</button>
                </div>

                {/* Besuchen Sie uns */}
                <div className="issa-footer-column">
                    <h3>Besuchen Sie uns</h3>

                    <div className="issa-footer-info">
                        <MapPin size={18} />
                        <span>
                            Schweinfurter Straße<br />
                            Gegenüber der Walter Tankstelle<br />
                            97437 Haßfurt
                        </span>
                    </div>

                    <div className="issa-footer-info">
                        <Clock size={18} />
                        <span>
                            Öffnungszeiten<br />
                            Mo-Fr: 09:00 - 18:00<br />
                            Sa: 09:00 - 13:00<br />
                            So: Geschlossen
                        </span>
                    </div>
                </div>

            </div>

            <div className="issa-footer-bottom">
                <p>
                    ©️ {new Date().getFullYear()} ISSA AUTOMOBILE.
                    Alle Rechte vorbehalten.
                </p>

                <p>MIT LEIDENSCHAFT FÜR AUTOMOBILE</p>

                <button
                    className="issa-footer-top"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    aria-label="Nach oben"
                    title="Nach oben"
                >
                    <ArrowUp size={17} />
                </button>
            </div>
        </footer>
    );
}

export default Footer;