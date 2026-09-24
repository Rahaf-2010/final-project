const express = require('express');

const upload = require('../middleware/uploadMiddleware');

const {createSellRequest, getSellRequests} = require('../controllers/sellRequestController');

const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, upload.array('images', 20), createSellRequest);
router.get('/', protect, getSellRequests);
module.exports = router;