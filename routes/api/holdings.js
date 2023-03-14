const express = require('express');
const router = express.Router();
const holdingsCtrl = require('../../controllers/api/holdings');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// All paths start with '/api/transactions'

// POST /api/users
router.post('/', ensureLoggedIn, holdingsCtrl.create);
router.get('/', ensureLoggedIn, holdingsCtrl.index);
router.put('/:id', ensureLoggedIn, holdingsCtrl.update);

module.exports = router;
