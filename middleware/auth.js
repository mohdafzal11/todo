import jwt from 'jsonwebtoken';
import User from "../models/user.js";

const auth = async (req, res, next) => {
    console.log("sfsdffds")
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findOne({ _id: decoded.id });
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default auth;
