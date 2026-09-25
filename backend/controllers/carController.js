const Car = require('../models/Car');

const getCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.status(200).json(cars);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);

        res.status(500).json({ message: 'Die Fahrzeuge konnten nicht abgerufen werden' });
    }
};

const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error('Fehler beim Abrufen des Fahrzeugs:', error);

        res.status(500).json({ message: 'Das Fahrzeug konnte nicht abgerufen werden' });
    }
};

module.exports = { getCars, getCarById };