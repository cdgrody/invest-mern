const UserBalance = require("../../models/userBalance");

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
  console.log("update user function ---------");
  try {
    const userBalance = await UserBalance.findById(req.params.id)
    console.log('userBalance', userBalance, req.body.balance)
    const newBalance = req.body.balance;
    userBalance.balance = newBalance;
    console.log(userBalance);
    await userBalance.updateOne({ balance: newBalance });
    console.log('last user balance', userBalance);
    res.json(userBalance);
  } catch (err) {
    res.status(400).json(err);
  }
}
