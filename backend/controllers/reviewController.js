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

    const updateReview = async (req, res) => {
        try {
            const {rating, message} = req.body;
            const review = await Review.findOne({
                _id:req.params.id,
                user: req.user.id
            });
            if (!review) {
                return res.status(404).json({message: "Bewertung nicht gefunden."});
            }

            review.rating = rating;
            review.message = message;
            await review.save();

            res.status(200).json({
                message: "Bewertung erfolgreich aktualisiert.",
                review
            });
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Bewertung.", error);
            res.status(500).json({message: "Die Bewertung konnte nicht aktualisiert werden."});
        }
    };

    const deleteReview = async (req, res) => {
        try {
            const review = await Review.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id
            });

            if (!review) {
                return res.status(404).json({message: "Bewertung nicht gefunden."});
            }

            res.status(200).json({message: "Bewertung erfolgreich gelöscht."});
        } catch (error) {
            console.error("Fehler beim Löschen der Bewertung.", error);
            res.status(500).json({message: "Die Bewertung konnte nicht gelöscht werden."});
        }
    };

    const updateAdminReply = async (req, res) => {
    try {
        const { adminReply } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Bewertung nicht gefunden.",
            });
        }

        review.adminReply = adminReply || "";

        await review.save();

        res.status(200).json({
            message: "Antwort erfolgreich gespeichert.",
            review,
        });
    } catch (error) {
        console.error("Fehler beim Speichern der Antwort:", error);

        res.status(500).json({
            message: "Fehler beim Speichern der Antwort.",
        });
    }
};

const deleteAdminReply = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Bewertung nicht gefunden.",
            });
        }

        review.adminReply = "";

        await review.save();

        res.status(200).json({
            message: "Antwort erfolgreich gelöscht.",
            review,
        });
    } catch (error) {
        console.error("Fehler beim Löschen der Antwort:", error);

        res.status(500).json({
            message: "Fehler beim Löschen der Antwort.",
        });
    }
};

    const deleteReviewByAdmin = async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) {
                return res.status(404).json({message: "Bewertung nicht gefunden."});
            }

            await review.deleteOne();

            res.status(200).json({message: "Bewertung erfolgreich gelöscht."});
        } catch (error) {
            console.error("Fehler beim Löschen der Bewertung durch Admin.", error);
            res.status(500).json({message: "Die Bewertung konnte nicht gelöscht werden."});
        }
    };

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    updateAdminReply,
    deleteAdminReply,
    deleteReviewByAdmin
};