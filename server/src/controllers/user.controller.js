import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';

const t = process.env.JWT_TOKEN || 'secret';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await UserModel.findOne({ username });
    if (user) {
        return res.json({ message: 'user already exists' });
    }

    const hP = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hP });
    await newUser.save();

    res.json({ message: 'user created successfully' });
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: 'user doesnt exist' });
    }

    const isPV = await bcrypt.compare(password, user.password);

    if (!isPV) {
        returnres.json({ message: 'invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, t);
    res.json({ token, userID: user._id });
}

export const verifiedToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, t, (err) => {
            if (err) return res.sendStatus(403);
            next();
        })
    } else {
        return res.sendStatus(401);
    }
}