import express from "express";
import cors from "cors";
import { sample_shoes, sample_tags } from "./data";

const app = express();
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

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
