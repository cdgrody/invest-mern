const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')

module.exports = {
    create,
    login,
    checkToken,
    update
}

async function create(req, res) {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json( createJWT(user) );
    } catch(err) {
        console.log(err)
        res.status(400).json('Bad Credentials');
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

async function update(req, res) {
    console.log('update user function ---------')
    try {
        const user = await User.findById( req.user._id)
        const newBalance = req.body.balance;    
        console.log('user to update after this ---------', user.balance, newBalance)
            await user.updateOne({ balance: newBalance });
            
            console.log(user)
            res.json(user)

    } catch (err) {
        res.status(400).json(err)
    }
}


/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}
