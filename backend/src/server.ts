import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import path from 'path';

import shoesRouter from './router/shoes.router';
import userRouter from './router/user.router';
import orderRouter from './router/order.router'
import { dbConnect } from './configs/database.config';

async function startServer() {
  try {
    await dbConnect(); // Attend la connexion à la base de données

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/api/shoes", shoesRouter);
    app.use("/api/users", userRouter);
    app.use("/api/orders", orderRouter);

    app.use(express.static('public'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'))
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Website served on port :" + port);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    // Traitez l'erreur selon vos besoins (par exemple, terminer l'application)
  }
}

startServer();
