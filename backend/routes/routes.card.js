const router = require('express').Router();
const cardController = require('../controllers/controller.card');
const { protect } = require("../middleware/auth");

router.post('/create', protect, cardController.post_card)

router.get('/read', protect, cardController.get_card)

router.post('/delete', protect, cardController.delete_card)

router.put('/edit/:id', protect, cardController.update_card)

router.get('/details/:id', protect, cardController.find_by_id)

// Views

module.exports = router;