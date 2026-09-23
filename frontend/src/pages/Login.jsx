import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

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
                <input
                    type="password"
                    name="password"
                    placeholder="Passwort"
                    value={formData.password}
                    onChange={handleChange}
                    />
                <button type="submit">Login</button>
            </form>
            
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;