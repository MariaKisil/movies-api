const {Router} = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    const {username, password: initialPassword} = req.body;
    const password = await bcrypt.hash(initialPassword, 10);

    try {
        const user = await User.create({username, password});
        res.status(201).json(user);
    } catch (e) {
        // Return error when such user exists
        if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({message: 'User already exists. Try to log in'});
        }

        console.error(e);
        res.status(500).json({message: 'Server error'});
    }
});

userRouter.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
});


module.exports = userRouter;