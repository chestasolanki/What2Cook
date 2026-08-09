const express = require('express');
const router = express.Router();
const savedRecipeController = require('../controllers/savedRecipeController');

router.get('/', savedRecipeController.getSaved);
router.post('/', savedRecipeController.save);
router.delete('/:id', savedRecipeController.remove);

module.exports = router;
