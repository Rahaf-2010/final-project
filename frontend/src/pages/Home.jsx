import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Willkommen bei Issa Automobile!</h1>

            <p>Ihr zuverlässiger Partner für den Kauf und Verkauf von Gebrauchtfahrzeugen.</p>

            <div>
                <h2>Unsere Dienstleistungen</h2>

                <p>Ankauf und Verkauf von Gebrauchtfahrzeugen aller Art</p>
                <p>Umfassende Fahrzeugprüfung</p>
                <p>Kostenlose Probefahrt</p>
                <p>Kostenlose Abholung</p>
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