import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body
    const user = sample_users.find(user => user.email === email && user.password === password)

    if (user) {
        res.send(generateTokenReponse(user))
    }
    else {
        res.status(400).send("Tu t'es trompé d'email ou de mot passe frérot")
    }
})

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