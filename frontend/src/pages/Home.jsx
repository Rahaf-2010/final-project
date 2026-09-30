
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div> 
            <h1>Willkommen bei ISSA Automobile!</h1>

            <p>Ihr zuverlässiger Partner für den Kauf und Verkauf von Gebrauchtfahrzeugen.</p>
            <div>
                <button onClick={() => navigate("/cars")}>Auto Kaufen</button>
                <button onClick={() => navigate("/sell-request")}>Auto Verkaufen</button>
                <button>Meine Anfragen</button>
                <button onClick={() => navigate("/about-us")}>Über uns</button>
            </div>
        </div>
    );
}


export default Home;