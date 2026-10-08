import {useNavigate, useLocation} from "react-router-dom";
import {LogOut, Home} from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const homePath = location.pathname.startsWith("/admin") ? "/admin" : "/";
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav>
            {location.pathname !== "/" && 
                location.pathname !== "/admin" && 
                location.pathname !== "/login" && 
                location.pathname !== "/register" && (
                <button type="button" onClick={() => navigate(homePath)}>
                    <Home size={10} /> Home
                </button>
            )}
            {location.pathname !== "/login" && 
                location.pathname !== "/register" && (
                <button type="button" onClick={handleLogout}>
                    <LogOut size={10} /> Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;