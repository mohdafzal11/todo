

import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const signup = async (req, res) => {
    console.log(req.body)
    try {
        const {username ,  email, password } = req.body;
        const newUser = await User.create({ username ,  email, password });
        const token = signToken(newUser._id);
        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect email or password');
        }
        const token = signToken(user._id);
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};