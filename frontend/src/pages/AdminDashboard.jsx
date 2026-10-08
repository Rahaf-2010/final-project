import { useNavigate } from "react-router-dom";
function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button 
                type="button"
                onClick={() => navigate("/admin/cars")}>Inserieren
            </button>

            <button 
                type="button"
                onClick={() => navigate("/admin/sell-requests")}>Verkaufsanfragen
            </button>

            <button 
                type="button"
                onClick={() => navigate("/admin/reviews")}>Bewertungen
            </button>
        </div>
    );
}

export default AdminDashboard;