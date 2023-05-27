import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = (): Promise<void> => {
  console.log("Connecting to the DB");
  return connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
    .then(() => {
      console.log("Connected successfully to the DB");
    })
    .catch((error) => {
      console.error("Error connecting to the DB:", error);
      throw error; // Renvoie l'erreur pour la traiter ultérieurement si nécessaire
    });
};
