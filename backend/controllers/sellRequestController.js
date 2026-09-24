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

module.exports = { createSellRequest, getSellRequests };