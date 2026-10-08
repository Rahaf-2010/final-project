const express = require("express");
const {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    updateAdminReply,
    deleteAdminReply,
    deleteReviewByAdmin
} = require("../controllers/reviewController");

const {protect, adminOnly} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createReview);
router.get("/", getReviews);
router.get("/admin", protect, adminOnly, getReviews);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

router.delete("/admin/:id", protect, adminOnly, deleteReviewByAdmin);
router.put("/admin/:id/reply", protect, adminOnly, updateAdminReply);
router.delete("/admin/:id/reply", protect, adminOnly, deleteAdminReply);

module.exports = router;