const UserBalance = require('../../models/userBalance')
// const User = require('../../models/user')

module.exports = {
    create,
    index
}

async function create(req, res) {
    try {
        req.body.user = req.user
        const userBalance = await UserBalance.create(req.body)
        res.json(userBalance)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        console.log('index userbalance controller -------------', req.user)
        const userBalance = await UserBalance.find({ user: req.user })
        console.log(' userbalance  <><><><>>><<>>', userBalance)
        res.json(userBalance[0])
    } catch (err) {
        res.status(400).json(err)
    }
}