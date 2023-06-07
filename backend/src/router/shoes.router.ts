import { Router } from 'express';
import { sample_shoes, sample_tags } from '../data';
const router = require('express').Router();
import asyncHandler = require('express-async-handler');
import { ShoesModel } from '../models/shoes.model';


router.get("/seed", asyncHandler(

    // #swagger.description = 'seed'

    async (req: any, res: any) => {
        const shoesCount = await ShoesModel.countDocuments();
        if (shoesCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await ShoesModel.create(sample_shoes);
        res.send("Seed Is Done!");
    }
))

router.get("/", asyncHandler(

    // #swagger.description = 'renvoie toutes les chaussures du site'

    async (req, res) => {
        const shoes = await ShoesModel.find();
        res.status(200).send(shoes);
    })
)

router.get("/search/:searchTerm", asyncHandler(

    // #swagger.description = 'permet de renvoyer les chaussures qui correspondent à un terme de recherche'

    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i'); // pas case sensitive le 'i'
        const shoes = await ShoesModel.find({ name: { $regex: searchRegex } })
        res.send(shoes);
    })
)

router.get("/tags", asyncHandler(

    // #swagger.description = 'renvoie les tags qui correspondent à une chaussure'

    async (req, res) => {
        const tags = await ShoesModel.aggregate([
            {
                $unwind: '$tags' // 2 chaussures 3 tags, unwind tags => 6 shoes en tags 1
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 })
        const all = {
            name: 'All',
            count: await ShoesModel.countDocuments()
        }
        tags.unshift(all); // ajoute au début de l'array
        res.send(tags);
    })
)

router.get("/tag/:tagName", asyncHandler(

    // #swagger.description = 'renvoie les chaussures qui correspondent a un tag donné'

    async (req, res) => {
        const shoes = await ShoesModel.find({ tags: req.params.tagName })
        res.send(shoes);
    })
)
router.get("/:shoesId", asyncHandler(

    // #swagger.description = 'permet de renvoyer un chaussure via son ID'

    async (req, res) => {
        const shoes = await ShoesModel.findById(req.params.shoesId);
        res.send(shoes);
    })
)
export default router;