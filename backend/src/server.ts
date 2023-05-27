import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import path from 'path';

import shoesRouter from './router/shoes.router';
import userRouter from './router/user.router';
import orderRouter from './router/order.router'
import { dbConnect } from './configs/database.config';
dbConnect();

import asyncHandler = require('express-async-handler');


const app = express();
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200", "https://localhost:5000"]
}));

app.use("/api/shoes", shoesRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
})
