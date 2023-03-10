const UserBalance = require('../../models/userBalance')
const User = require('../../models/user')

// module.exports = {
//     create,
//     index
// }

async function create(req, res) {
    // console.log('enter create transaction function >>>>>>>>>>>>>>>>>>')
    // try {
    //     const user = await User.findById( req.user._id)
    //     req.body.asset = assetList[req.body.asset]
    //     const newBalance = req.body.transactionType*parseInt(req.body.dollars) + user.balance;
    //     if (newBalance >= 0) {
    //         const transaction = await Transaction.create(req.body)
    //         res.json(transaction)
    //     } else {
    //         err
    //     }
    // } catch (err) {
    //     res.status(400).json(err)
    // }
}

// async function index(req, res) {
//     try {
//         const transactions = await Transaction.find({ user: req.user, public: true }).sort( {createdAt: -1})
//         res.json(transactions)
//     } catch (err) {
//         res.status(400).json(err)
//     }
// }