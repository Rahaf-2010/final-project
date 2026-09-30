const SellRequest = require('../models/SellRequest');

const createSellRequest = async (req, res) => {
    try {
        const { vehicleType, brandModel, year, mileage, desiredPrice, phone, email, images } = req.body;

        const imagePaths = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];

        const sellRequest = new SellRequest({
            user: req.user.id,
            vehicleType,
            brandModel,
            year,
            mileage,
            desiredPrice,
            phone,
            email,
            images: imagePaths,
        });

        await sellRequest.save();

        res.status(201).json({ message: 'Verkaufsanfrage erfolgreich erstellt', request: sellRequest });
    } catch (error) {
        console.error('Fehler beim Erstellen der Verkaufsanfrage:', error);

        res.status(500).json({ message: 'Die Anfrage konnte nicht gesendet werden' });
    }
};

const getSellRequests = async (req, res) => {
    try {
        const requests = await SellRequest.find({user: req.user.id}).sort({ createdAt: -1 });

        res.status(200).json(requests);
    } catch (error) {
        console.error('Fehler beim Abrufen der Verkaufsanfragen:', error);
        res.status(500).json({ message: 'Die Anfragen konnten nicht abgerufen werden' });
    }
};

const updateSellRequest = async (req, res) => {
    try{
        const request = await SellRequest.findOne({ _id: req.params.id, user: req.user.id });

        if (!request) {
            return res.status(404).json({ message: 'Verkaufsanfrage nicht gefunden' });
        }
        if (request.status !== 'In Bearbeitung') {
            return res.status(400).json({ message: "Diese Anfrage kann nicht mehr bearbeitet werden" });
        }

        const { vehicleType, brandModel, year, mileage, desiredPrice, phone, email } = req.body;

        request.vehicleType = vehicleType;
        request.brandModel = brandModel;
        request.year = year;
        request.mileage = mileage;
        request.desiredPrice = desiredPrice;
        request.phone = phone;
        request.email = email;

        if (req.files && req.files.length > 0) {
            request.images = req.files.map((file) => `/uploads/${file.filename}`);
        }

        await request.save();

        res.status(200).json({ message: 'Verkaufsanfrage erfolgreich aktualisiert', request });
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Verkaufsanfrage:', error);

        res.status(500).json({ message: 'Die Verkaufsanfrage konnte nicht aktualisiert werden' });
    }
};

const deleteSellRequest = async (req, res) => {
    try {
        const request = await SellRequest.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!request) {
            return res.status(404).json({ message: "Verkauf Anfrage nicht gefunden" });
        }
        await request.deleteOne();
        res.status(200).json({ message: "Diese Anfrage wurde erfolgreich gelöscht" });
    } catch (error) {
        console.error("Fehler beim Löschen der Anfrage:", error);

        res.status(500).json({ message: "Die Verkaufsanfrage konnte nicht gelöscht werden" });
    }
};



module.exports = { createSellRequest, getSellRequests, updateSellRequest, deleteSellRequest };