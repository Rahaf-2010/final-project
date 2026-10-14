import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, CarFront, Info, UserRound, ClipboardList, ArrowLeft, Star, KeyRound, Home, Menu, X,} from "lucide-react";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const isAdmin = location.pathname.startsWith("/admin");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    const closeMenu = () => setMenuOpen(false);

    const goTo = (path) => {
        closeMenu();
        navigate(path);
    };

    const handleBack = () => {
        closeMenu();
        navigate(-1);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        closeMenu();
        navigate("/");
    };

    if (isAuthPage) {
        return null;
    }

    return (
        <header className="issa-navbar">
            <span className="issa-navbar-brand">
                ISSA <strong>AUTOMOBILE</strong>
            </span>

            {location.pathname !== "/" && (
                <button
                    type="button"
                    className="issa-back-button"
                    onClick={handleBack}
                    aria-label="Zurück"
                    title="Zurück"
                >
                    <ArrowLeft size={21} />
                </button>
            )}

            <button
                type="button"
                className="issa-menu-toggle"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={menuOpen}
                aria-controls="issa-navigation"
            >
                {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>

            <nav
                id="issa-navigation"
                className={`issa-nav-links ${menuOpen ? "is-open" : ""}`}
            >
                {!isAdmin && (
                    <>
                        {location.pathname !== "/" && (
                            <button
                                type="button"
                                onClick={() => goTo("/")}
                                aria-label="Home"
                                title="Home"
                            >
                                <Home size={21} />
                                <span className="issa-mobile-label">Home</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => goTo("/cars")}
                            aria-label="Fahrzeuge"
                            title="Fahrzeuge"
                        >
                            <CarFront size={21} />
                            <span className="issa-mobile-label">Fahrzeuge</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo("/sell-request")}
                            aria-label="Fahrzeug verkaufen"
                            title="Fahrzeug verkaufen"
                        >
                            <ClipboardList size={21} />
                            <span className="issa-mobile-label">Fahrzeug verkaufen</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo("/meine-anfragen")}
                            aria-label="Meine Anfragen"
                            title="Meine Anfragen"
                        >
                            <UserRound size={21} />
                            <span className="issa-mobile-label">Meine Anfragen</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo("/about-us")}
                            aria-label="Über uns"
                            title="Über uns"
                        >
                            <Info size={21} />
                            <span className="issa-mobile-label">Über uns</span>
                        </button>
                    </>
                )}

                {!token && (
                    <button
                        type="button"
                        onClick={() => goTo("/login")}
                        aria-label="Login"
                        title="Anmelden"
                    >
                        <KeyRound size={21} />
                        <span className="issa-mobile-label">Anmelden</span>
                    </button>
                )}

                {isAdmin && (
                    <>
                        {location.pathname !== "/admin" && (
                            <button
                                type="button"
                                onClick={() => goTo("/admin")}
                                aria-label="Dashboard"
                                title="Dashboard"
                            >
                                <Home size={21} />
                                <span className="issa-mobile-label">Dashboard</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => goTo("/admin/cars")}
                            aria-label="Fahrzeugangebote erstellen"
                            title="Fahrzeugangebote erstellen"
                        >
                            <CarFront size={21} />
                            <span className="issa-mobile-label">Fahrzeuge</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo("/admin/sell-requests")}
                            aria-label="Eingegangene Anfragen"
                            title="Eingegangene Anfragen"
                        >
                            <ClipboardList size={21} />
                            <span className="issa-mobile-label">Anfragen</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo("/admin/reviews")}
                            aria-label="Bewertungen"
                            title="Bewertungen"
                        >
                            <Star size={21} />
                            <span className="issa-mobile-label">Bewertungen</span>
                        </button>
                    </>
                )}

                {token && (
                    <button
                        type="button"
                        className="issa-logout"
                        onClick={handleLogout}
                        aria-label="Logout"
                        title={`Abmelden${user?.name ? `: ${user.name}` : ""}`}
                    >
                        <LogOut size={21} />
                        <span className="issa-mobile-label">Abmelden</span>
                    </button>
                )}
            </nav>
        </header>
    );
}

export default Navbar;