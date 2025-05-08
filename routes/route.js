const express = require('express');
const router = express.Router();

const promptController = require('../controllers/prompt_controller');
router.get('/prompt/:id', promptController.getPrompt);
router.post('/prompt', promptController.createPrompt);

module.exports = router;