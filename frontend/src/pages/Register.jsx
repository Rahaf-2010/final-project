import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import {Eye, EyeOff} from "lucide-react";


function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        address: "",
        phone: "",
        email: "",
        password: ""

    });

    const [message, setMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const passwordIsValid = formData.password.length >= 8 &&
        /[A-Z]/.test(formData.password) &&
        /[a-z]/.test(formData.password) &&
        /[0-9]/.test(formData.password) &&
        /[^A-Za-z0-9]/.test(formData.password);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!passwordIsValid) {
            setMessage("Das Passwort muss mindestens 8 Zeichen lang sein und Großbuchstaben, Kleinbuchstaben, Zahlen sowie Sonderzeichen enthalten.");
            return;
        }
        try {
            const userData = {
                name: formData.name,
                surname: formData.surname,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                password: formData.password
            };

            console.log("Senden", userData);

            const response = await api.post("/auth/register", userData);

            console.log("Antwort vom Server:", response.data);

            setMessage("Registierung erfolgreich!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);

            setMessage(error.response?.data?.message || "Fehler bei der Registrierung.");
        }
    };

    return (
        <div>
            <h1>Registrierung</h1>

            <form onSubmit={handleSubmit}> 
                <input 
                    type="text"
                    name="name"
                    placeholder="Vorname"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Nachname"
                    value={formData.surname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Telefonnummer"
                    value={formData.phone}
                    onChange={handleChange}
                />
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
                            paddingRight: "40px"
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
                            background: "none",
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
                <p>
                    Das Passwort muss mindestens 8 Zeichen lang sein und Großbuchstaben, 
                    Kleinbuchstaben, Zahlen sowie Sonderzeichen enthalten.
                </p>
                <button type="submit">Registrieren</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;