const Transaction = require('../../models/transaction')

module.exports = {
    create,
    index
}

async function create(req, res) {
    try {
        req.body.ticker = req.body.ticker.toUpperCase()
        const transaction = await Transaction.create(req.body)
        res.json(transaction)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const transaction = await Transaction.find({ user: req.user, public: true }).sort( {createdAt: -1})
        res.json(transaction)
    } catch (err) {
        res.status(400).json(err)
    }
}