import { useNavigate, useLocation } from "react-router-dom";
import {
    LogOut,
    CarFront,
    Info,
    UserRound,
    ClipboardList,
    ArrowLeft,
    Star,
    KeyRound,
    Home,
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin = location.pathname.startsWith("/admin");


    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
    <header className="issa-navbar">
        {!isAuthPage && (
            <>
                <span>ISSA <strong>AUTOMOBILE</strong></span>

                {location.pathname !== "/" && location.pathname !== "/login" && (
                    <button
                        type="button"
                        className="issa-back-button"
                        onClick={() => navigate(-1)}
                        aria-label="Zurück"
                        title="Zurück"
                    >
                        <ArrowLeft size={21} />
                    </button>
                )}
                <nav className="issa-nav-links">

                    {!isAdmin && (
                        <>
                        {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" && (
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                aria-label="Home"
                                title="Home"
                            >
                                <Home size={21} />
                            </button>
                        )}
                            <button
                                type="button"
                                onClick={() => navigate("/cars")}
                                aria-label="Fahrzeuge"
                                title="Fahrzeuge"
                            >
                                <CarFront size={21} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/sell-request")}
                                aria-label="Fahrzeug verkaufen"
                                title="Fahrzeug verkaufen"
                            >
                                <ClipboardList size={21} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/meine-anfragen")}
                                aria-label="Meine Anfragen"
                                title="Meine Anfragen"
                            >
                                <UserRound size={21} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/about-us")}
                                aria-label="Über uns"
                                title="Über uns"
                            >
                                <Info size={21} />
                            </button>
                        </>
                    )}
                    {!token && (
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                aria-label="Login"
                                title="Anmelden"
                            >
                                <KeyRound size={21} />
                            </button>
                        )}

                    {isAdmin && (
                        <>
                        {location.pathname !== "/admin" && (
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                aria-label="Dashboard"
                                title="Dashboard"
                            >
                                <Home size={21} />
                            </button>
                        )}
                            <button
                                type="button"
                                onClick={() => navigate("/admin/cars")}
                                aria-label="Fahrzeugangebote erstellen"
                                title="Fahrzeugangebote erstellen"
                            >
                                <CarFront size={21} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/sell-requests")}
                                aria-label="Eingegangene Anfragen"
                                title="Eingegangene Anfragen"
                            >
                                <ClipboardList size={21} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/reviews")}
                                aria-label="Bewertungen"
                                title="Bewertungen"
                            >
                                <Star size={21} />
                            </button>
                            </>
                                    )}

                                    {token && (
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            aria-label="Logout"
                                            title={`Abmelden${user?.name ? `: ${user.name}` : ""}`}
                                        >
                                            <LogOut size={21} />
                                        </button>

                                    )}
                                </nav>
                            </>
                        )}
    </header>
);
}
export default Navbar;