import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import api from "../services/api";


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
                <input
                    type="password"
                    name="password"
                    placeholder="Passwort"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Registrieren</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;