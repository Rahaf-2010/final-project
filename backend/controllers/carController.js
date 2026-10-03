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

const createCar = async (req, res) => {
    try{
        const {
            vehicleType,
            brandModel,
            year,
            mileage,
            price,
            description,
            color
        } = req.body;

        const imagepaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

        const lastCar = await Car.findOne().sort({ offerNumber: -1 });

        const offerNumber = lastCar?.offerNumber ? lastCar.offerNumber + 1 : 1001;

        const newCar = new Car({
            vehicleType,
            brandModel,
            year,
            mileage,
            price,
            description,
            offerNumber,
            color,
            images: imagepaths
        });

        await newCar.save();

        
        res.status(201).json({
            message: 'Fahrzeug erfolgreich veröffentlicht',
            car: newCar
        });
    } catch (error) {
        console.error('Fehler beim Erstellen des Fahrzeugs:', error);

        res.status(500).json({ message: 'Das Fahrzeug konnte nicht erstellt werden' });
    }
};

const updateCar = async (req, res) => {
        try{
            const car = await Car.findById(req.params.id);

            if (!car) {
                return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });
            }

            const {
                vehicleType,
                brandModel,
                year,
                mileage,
                price,
                description,
                color
            } = req.body;

            const imagepaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

            car.vehicleType = vehicleType;
            car.brandModel = brandModel;
            car.year = year;
            car.mileage = mileage;
            car.price = price;
            car.description = description;
            car.color = color;
            if (imagepaths.length > 0) {
                car.images = imagepaths;
            }

            await car.save();

            res.status(200).json({ message: 'Fahrzeug erfolgreich aktualisiert', car: car });
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Fahrzeugs:', error);
            res.status(500).json({ message: 'Das Fahrzeug konnte nicht aktualisiert werden' });
        }
};

const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });
        }

        await car.deleteOne();

        res.status(200).json({ message: 'Fahrzeug erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Fahrzeugs:', error);
        res.status(500).json({ message: 'Das Fahrzeug konnte nicht gelöscht werden' });
    }
};
module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };