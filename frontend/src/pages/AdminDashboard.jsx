import { useNavigate } from "react-router-dom";
import {
    CarFront,
    ClipboardList,
    Star,
    LayoutDashboard
} from "lucide-react";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Fahrzeuge verwalten",
            description: "Fahrzeuge hinzufügen, bearbeiten und verwalten.",
            icon: CarFront,
            path: "/admin/cars",
            button: "Fahrzeuge verwalten"
        },
        {
            title: "Verkaufsanfragen",
            description: "Eingegangene Fahrzeuganfragen ansehen und bearbeiten.",
            icon: ClipboardList,
            path: "/admin/sell-requests",
            button: "Anfragen ansehen"
        },
        {
            title: "Bewertungen",
            description: "Kundenbewertungen ansehen und verwalten.",
            icon: Star,
            path: "/admin/reviews",
            button: "Bewertungen ansehen"
        }
    ];

    return (
        <main className="admin-dashboard">
            <div className="admin-dashboard-container">
                
                <header className="admin-dashboard-header">
                    <span className="admin-eyebrow">
                        ISSA AUTOMOBILE · VERWALTUNG
                    </span>

                    <LayoutDashboard size={34} />

                    <h1>Admin Dashboard</h1>

                    <p>
                        Willkommen im Verwaltungsbereich.
                        Wählen Sie einen Bereich aus.
                    </p>
                </header>

                <div className="admin-dashboard-grid">
                    {sections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <article
                                className="admin-dashboard-card"
                                key={section.path}
                            >
                                <div className="admin-card-icon">
                                    <Icon size={27} />
                                </div>

                                <h2>{section.title}</h2>

                                <p>{section.description}</p>

                                <button
                                    type="button"
                                    onClick={() => navigate(section.path)}
                                >
                                    {section.button}
                                    <span aria-hidden="true"> →</span>
                                </button>
                            </article>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default AdminDashboard;