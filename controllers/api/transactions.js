const Transaction = require('../../models/transaction')

module.exports = {
    create
}

async function create(req, res) {
    console.log("controller function >>>>>>>>>>>>")
    console.log(req.body)
    try {
        const transaction = await Transaction.create(req.body)
        console.log("transaction")
        res.json(transaction)
    } catch (err) {
        res.status(400).json(err)
    }
}