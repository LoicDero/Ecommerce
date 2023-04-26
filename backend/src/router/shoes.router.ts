import { Router } from 'express';
import { sample_shoes, sample_tags } from '../data';
const router = Router();
import asynceHandler = require('express-async-handler');
import { ShoesModel } from '../models/shoes.model';

router.get("/seed", asynceHandler(
    async (req: any, res: any) => {
        const shoesCount = await ShoesModel.countDocuments();
        if(shoesCount>0){
            res.send("Seed is already done!");
            return;
        }
        await ShoesModel.create(sample_shoes);
        res.send("Seed Is Done!");
}
))

router.get("/", (req, res) => {
    res.send(sample_shoes);
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const shoes = sample_shoes
        .filter(shoes => shoes.name.toLowerCase()
            .includes(searchTerm.toLowerCase()));
    res.send(shoes);
})

router.get("/tags", (req, res) => {
    res.send(sample_tags)
})

router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const shoes = sample_shoes.
        filter(shoes => shoes.tags?.includes(tagName));
    res.send(shoes);
})

router.get("/:shoesId", (req, res) => {
    const shoesId = req.params.shoesId;
    const shoes = sample_shoes.find(shoes => shoes.id == shoesId);
    res.send(shoes);
})

export default router;