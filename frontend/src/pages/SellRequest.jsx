import {useState} from "react";

import api from "../services/api";

function SellRequest() {

    
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        vehicleType: "",
        brandModel: "",
        year: "",
        mileage: "",
        desiredPrice: "",
        phone: "",
        email: "",
        images: []
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try{
            const token = localStorage.getItem("token");

            const data = new FormData();
            data.append("vehicleType", formData.vehicleType);
            data.append("brandModel", formData.brandModel);
            data.append("year", formData.year);
            data.append("mileage", formData.mileage);
            data.append("desiredPrice", formData.desiredPrice);
            data.append("phone", formData.phone);
            data.append("email", formData.email);

            formData.images.forEach((image) => {
                data.append(`images`, image);
            });

            const response = await api.post("/sell-requests", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage(response.data.message || "Anfrage erfolgreich gesendet");

            setFormData({
                vehicleType: "",
                brandModel: "",
                year: "",
                mileage: "",
                desiredPrice: "",
                phone: "",
                email:"",
                images: []
            });
        } catch (error) {
            console.error("Fehler beim senden der Anfrage:", error);

            setMessage(error.response?.data?.message || "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
        }
    };

    return (
        <div >
            <h1>Auto verkaufen</h1>
            <form onSubmit= {handleSubmit}>
                <input
                    type="text"
                    name="vehicleType"
                    placeholder="Fahrzeugtyp"
                    value={formData.vehicleType}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="brandModel"
                    placeholder="Marke/Modell"
                    value={formData.brandModel}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Baujahr"
                    value={formData.year}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="mileage"
                    placeholder="Kilometerstand"
                    value={formData.mileage}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="desiredPrice"
                    placeholder="Gewünschter Preis"
                    value={formData.desiredPrice}
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
                    placeholder="E-Mail-Adresse"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label>Bilder des Fahrzeugs:</label>
                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="submit">Anfrage senden</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SellRequest;