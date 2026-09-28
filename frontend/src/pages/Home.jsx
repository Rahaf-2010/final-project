import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Willkommen bei Issa Automobile!</h1>

            <p>Ihr zuverlässiger Partner für den Kauf und Verkauf von Gebrauchtfahrzeugen.</p>

            <div>
                <h2>Unsere Dienstleistungen</h2>
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
                </div>
            </div>

            <div>
                <button onClick={() => navigate("/cars")}>Auto Kaufen</button>
                <button onClick={() => navigate("/sell-request")}>Auto Verkaufen</button>
                <button>Meine Anfragen</button>
                <button>Über uns</button>
            </div>
        </div>
    );
}


export default Home;