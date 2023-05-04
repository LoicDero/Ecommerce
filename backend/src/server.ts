import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";

import shoesRouter from './router/shoes.router';
import userRouter from './router/user.router';
import orderRouter from './router/order.router'
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/shoes", shoesRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
