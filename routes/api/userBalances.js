const express = require('express');
const router = express.Router();
const userBalancesCtrl = require('../../controllers/api/userBalances');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// All paths start with '/api/transactions'

// POST /api/users
router.post('/', ensureLoggedIn, userBalancesCtrl.create);
// router.get('/', ensureLoggedIn, userBalancesCtrl.index);

module.exports = router;
