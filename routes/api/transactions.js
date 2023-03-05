const express = require('express');
const router = express.Router();
const transactionsCtrl = require('../../controllers/api/transactions');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// All paths start with '/api/transactions'

// POST /api/users
router.post('/', transactionsCtrl.create);

module.exports = router;
