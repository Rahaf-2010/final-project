const express = require('express');

const upload = require('../middleware/uploadMiddleware');

const {createSellRequest, getSellRequests, updateSellRequest, 
    deleteSellRequest, getAllSellRequests, updateSellRequestStatus, deleteSellRequestByAdmin } = require('../controllers/sellRequestController');

const {protect, adminOnly} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, upload.array('images', 20), createSellRequest);
router.get('/', protect, getSellRequests);
router.put('/:id', protect, upload.array('images', 20), updateSellRequest);
router.delete('/:id', protect, deleteSellRequest);
router.get('/admin', protect, adminOnly, getAllSellRequests);
router.put('/admin/:id/status', protect, adminOnly, updateSellRequestStatus);
router.delete('/admin/:id', protect, adminOnly, deleteSellRequestByAdmin);





module.exports = router;