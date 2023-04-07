import express from "express";
import cors from "cors";
import { sample_shoes, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/shoes", (req, res) => {
    res.send(sample_shoes);
})

app.get("/api/shoes/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const shoes = sample_shoes
    .filter(food => food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));
    res.send(shoes);
})

app.get("/api/shoes/tags", (req, res) => {
    res.send(sample_tags)
})

app.get("/api/shoes/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const shoes = sample_shoes.
    filter(shoes => shoes.tags?.includes(tagName));
    res.send(shoes);
})

app.get("/api/shoes/:shoesId", (req, res) => {
    const shoesId = req.params.shoesId;
    const shoes = sample_shoes.find(shoes => shoes.id == shoesId);
    res.send(shoes);
})

app.post("/api/users/login", (req, res) =>{
    const {email, password} = req.body
    const user = sample_users.find(user => user.email === email && user.password === password)

    if(user){
        res.send(generateTokenReponse(user))
    }
    else{
        res.status(400).send("Tu t'es trompé d'email ou de mot passe frérot")
    }
})

const generateTokenReponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"TEST-RANDOM", {
        expiresIn:"30d"
    });

    user.token = token
    return user
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
