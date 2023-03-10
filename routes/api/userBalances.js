const express = require('express');
const router = express.Router();
const userBalancesCtrl = require('../../controllers/api/userBalances');

// All paths start with '/api/transactions'

// POST /api/users
router.get('/', userBalancesCtrl.index);
router.post('/', userBalancesCtrl.create);

module.exports = router;
