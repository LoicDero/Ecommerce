import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
const router = Router();
import asyncHandler from 'express-async-handler'; 
import { UserModel } from '../models/user.model';

router.get("/seed", asyncHandler(
    async (req: any, res: any) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email, password});

        if (user) {
            res.send(generateTokenReponse(user))
        }
        else {
            const BAD_REQUEST = 400
            res.status(BAD_REQUEST).send("Tu t'es trompé d'email ou de mot passe frérot")
        }
    }
))

const generateTokenReponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "TEST-RANDOM", {
        expiresIn: "30d"
    });

    user.token = token
    return user
}

export default router;