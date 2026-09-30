const Review = require("../models/Review");

const createReview = async (req, res) => {
    try {
        const {rating, message} = req.body;

        const review = new Review({
            user: req.user.id,
            rating,
            message
        });
        await review.save();
        res.status(201).json({
            message: "Vielen Dank für Ihre Bewertung!",
            review
        });
    } catch (error) {
        console.error("Fehler beim Erstellen der Bewertung.", error);

        res.status(500).json({
            message: "Die Bewertung konnte nicht gespeichert werden."
        });
    }
};

    const getReviews = async (req, res) => {
        try {
            const reviews = await Review.find().populate("user", "name surname email");

            res.status(200).json(reviews);
        } catch (error) {
            console.error("Fehler beim Abrufen der Bewertungen.", error);
            res.status(500).json({message: "Die Bewertungen konnten nicht geladen werden."});
        }
    };

module.exports = {
    createReview,
    getReviews
};