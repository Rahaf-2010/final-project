import {useNavigate, useLocation} from "react-router-dom";
import {LogOut, Home} from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav>
            {location.pathname !== "/" && 
                location.pathname !== "/login" && 
                location.pathname !== "/register" && (
                <button type="button" onClick={() => navigate("/")}>
                    <Home size={16} /> Home
                </button>
            )}
            {location.pathname !== "/login" && 
                location.pathname !== "/register" && (
                <button type="button" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;