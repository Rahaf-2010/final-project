import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <main className="issa-home">
            <section className="issa-hero">
                <div className="issa-hero-overlay" />

                <div className="issa-hero-content">
                    <p className="issa-eyebrow">
                        ISSA AUTOMOBILE · PREMIUM SELECTION
                    </p>

                    <h1>
                        Ihre nächste Fahrt.
                        <br />
                        <span>Ein neues Gefühl.</span>
                    </h1>

                    <p className="issa-hero-description">
                        Entdecken Sie ausgewählte Fahrzeuge, erstklassigen
                        Service und einen Autokauf, der sich richtig anfühlt.
                    </p>

                    <div className="issa-hero-actions">
                        <button
                            className="issa-button isssa-button-gold"
                            onClick={() => navigate("/cars")}
                        >
                            Fahrzeuge entdecken <span></span>
                        </button>

                        <button
                            className="issa-button isssa-button-outline"
                            onClick={() => navigate("/sell-request")}
                        >
                            Fahrzeug verkaufen
                        </button>
                    </div>

                    <div className="issa-hero-note">
                        <span className="issa-note-line" />
                        Qualität. Vertrauen. Fahrfreude.
                    </div>
                </div>

                <div className="issa-hero-index">
                    <span className="issa-index-line" />
                    <span>ISSA AUTOMOBILE</span>
                </div>
            </section>

            <section className="issa-services">
                <div className="issa-section-heading">
                    <p className="issa-eyebrow">UNSER SERVICE</p>
                    <h2>Alles rund ums Fahrzeug.</h2>
                    <p>
                        Wir begleiten Sie auf dem Weg zu Ihrem nächsten
                        Fahrzeug – persönlich und zuverlässig.
                    </p>
                </div>

                <div className="issa-service-grid">
                    <button
                        className="issa-service-card"
                        onClick={() => navigate("/cars")}
                    >
                        <span className="issa-service-number">01</span>
                        <span className="issa-service-icon">✧</span>
                        <h3>Fahrzeuge entdecken</h3>
                        <p>
                            Finden Sie das Fahrzeug, das zu Ihrem Leben passt.
                        </p>
                        <span className="issa-service-link">
                            Fahrzeuge ansehen →
                        </span>
                    </button>

                    <button
                        className="issa-service-card"
                        onClick={() => navigate("/sell-request")}
                    >
                        <span className="issa-service-number">02</span>
                        <span className="issa-service-icon">◇</span>
                        <h3>Fahrzeug verkaufen</h3>
                        <p>
                            Senden Sie uns Ihre Fahrzeugdaten für eine
                            Verkaufsanfrage.
                        </p>
                        <span className="issa-service-link">
                            Anfrage starten →
                        </span>
                    </button>

                    <button
                        className="issa-service-card"
                        onClick={() => navigate("/meine-anfragen")}
                    >
                        <span className="issa-service-number">03</span>
                        <span className="issa-service-icon">⌘</span>
                        <h3>Meine Anfragen</h3>
                        <p>
                            Behalten Sie Ihre Verkaufsanfragen bequem im Blick.
                        </p>
                        <span className="issa-service-link">
                            Anfragen ansehen →
                        </span>
                    </button>

                    <button
                        className="issa-service-card"
                        onClick={() => navigate("/about-us")}
                    >
                        <span className="issa-service-number">04</span>
                        <span className="issa-service-icon">✳</span>
                        <h3>Über uns</h3>
                        <p>
                            Lernen Sie ISSA Automobile und unsere Werte kennen.
                        </p>
                        <span className="issa-service-link">
                            Mehr erfahren →
                        </span>
                    </button>
                </div>
            </section>

            <section className="issa-promise">
    <div className="issa-promise-inner">
        <p className="issa-promise-eyebrow">
            ISSA AUTOMOBILE · UNSER VERSPRECHEN
        </p>

        <h2>
            Mehr Vertrauen.
            <span> Mehr Fahrfreude.</span>
        </h2>

        <p className="issa-promise-description">
            Ihr nächstes Fahrzeug beginnt mit einem guten Gefühl.
            Wir begleiten Sie persönlich und transparent auf dem Weg
            zu Ihrem nächsten Fahrzeug.
        </p>

        <div className="issa-promise-grid">
            <article className="issa-promise-card">
                <div className="issa-promise-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                </div>

                <h3>Vertrauen</h3>
                <p>
                    Persönliche Beratung und ein transparenter Umgang
                    stehen für uns im Mittelpunkt.
                </p>
            </article>

            <article className="issa-promise-card">
                <div className="issa-promise-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="10" cy="7" r="4" />
                        <path d="m16 11 2 2 4-4" />
                    </svg>
                </div>

                <h3>Persönlicher Service</h3>
                <p>
                    Wir nehmen uns Zeit für Ihre Wünsche und unterstützen
                    Sie bei Ihrer Fahrzeugentscheidung.
                </p>
            </article>

            <article className="issa-promise-card">
                <div className="issa-promise-icon">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 17h14l1-5-2-5H6l-2 5 1 5Z" />
                        <path d="M7 17v2m10-2v2M4 12h16" />
                        <circle cx="7.5" cy="14.5" r="1" />
                        <circle cx="16.5" cy="14.5" r="1" />
                    </svg>
                </div>

                <h3>Fahrfreude</h3>
                <p>
                    Entdecken Sie Fahrzeuge, die zu Ihren Vorstellungen
                    und Ihrem Alltag passen.
                </p>
            </article>
        </div>

        <button
            className="issa-promise-button"
            onClick={() => navigate("/cars")}
        >
            Fahrzeuge entdecken
        </button>
    </div>
</section>
        </main>
    );
}

export default Home;