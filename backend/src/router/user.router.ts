import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'; 
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/https_status';
import bcrypt from 'bcryptjs';

const router = Router();


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
        const user = await UserModel.findOne({ email });

        if (user) {
            const passwordAsh = await bcrypt.compare(password, user.password);
            const passwordNotAsh = user.password === password;
            if (passwordAsh || passwordNotAsh) {
                res.send(generateTokenReponse(user));
            } else {
                const BAD_REQUEST = 400;
                res.status(BAD_REQUEST).send("Password incorrect");
            }
        } else {
            const BAD_REQUEST = 400;
            res.status(BAD_REQUEST).send("Email not found");
        }
    }
));

router.post('/register', asyncHandler(
    async (req, res) => {
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send("Cet email est déjà utilisé");
            return;
        }
        
        const ecryptedPassword = await bcrypt.hash(password, 10);
        console.log(ecryptedPassword)

        const newUser:User = {
            id:'', 
            name,
            email: email.toLowerCase(),
            password: ecryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenReponse(dbUser));
    }
))

const generateTokenReponse = (user: User) => {
    const token = jwt.sign({
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;