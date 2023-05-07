import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";

import shoesRouter from './router/shoes.router';
import userRouter from './router/user.router';
import orderRouter from './router/order.router'
import { dbConnect } from './configs/database.config';
dbConnect();

import asyncHandler = require('express-async-handler');

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce',
      version: '1.0.0',
    },
  },
  apis: ['./router/shoes.router.ts', './router/user.router.ts' ],
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/shoes", shoesRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
