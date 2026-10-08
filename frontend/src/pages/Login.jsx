import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await api.post("/auth/login", formData);
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            navigate("/");
        } catch (error) {
            console.error("Fehler beim Login:", error.response.data);
            setMessage(error.response.data.message || "Fehler beim Login.");
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    value={formData.email}
                    onChange={handleChange}
                    />
                <div style={{ position: "relative", display: "inline-block" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Passwort"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            paddingRight: "40px",
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            border: "none",
                            background: "transparent",
                            padding: 0,
                            margin: 0,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <button type="submit">Login</button>
            </form>

            <p>Noch keinen Account? {""}
                <button type="button" onClick={() => navigate("/register")}>Jetzt registrieren</button>
            </p>
            
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;