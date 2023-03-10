const UserBalance = require("../../models/userBalance");
const Holding = require("../../models/holding");

module.exports = {
  create,
  index,
  update
};

async function create(req, res) {
  try {
    req.body.user = req.user;
    const userBalance = await UserBalance.create(req.body);
    res.json(userBalance);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const userBalance = await UserBalance.find({ user: req.user });
    res.json(userBalance[0]);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const userBalance = await UserBalance.findById(req.params.id)
    if(req.body.balance < 0) return res.status(400).json(err);
    const newBalance = req.body.balance;
    userBalance.balance = newBalance;
    await userBalance.updateOne({ balance: newBalance });
    res.json(userBalance);
  } catch (err) {
    res.status(400).json(err);
  }
}
