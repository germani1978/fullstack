import express from 'express';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt'
const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
})

userRouter.post('/', async (req, res, next) => {
    const { name, username, password } = req.body;

    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt);

    console.log({name, username, passwordHash});
    
    try {
        const user = new User({ name, username, passwordHash})
        const saveUser = await user.save();
        res.status(201).json(saveUser); 
    } catch (error) {
        next(error);        
    }
})

export default userRouter;