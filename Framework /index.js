const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

router.get('/status', botController.getStatus);
router.post('/message', botController.sendMessage);

module.exports = router;
