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

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Ecommerce',
    description: 'API du site d\'ecommerce WeThePast',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = '../swagger-output.json';
const jsonFile = require(outputFile)
//const endpointsFiles = ['./router/shoes.router.ts', './router/order.router.ts', './router/user.router.ts']
const endpointsFiles = ['./server.ts']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */


const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));

app.use("/api/shoes", shoesRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsonFile));

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.ts'); // Your project's root file
});

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
})
