//? Dependencies
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

//? Env
dotenv.config("../.env");

//? Atlas connection
export const conx = async () => {
  try {
    const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.tfk8jyc.mongodb.net/${process.env.ATLAS_DB}`;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(uri, options);// Conectamos al cliente de mongo usando la uri y las opciones
    return client.db() // Devolvemos el objeto de base de datos para interactuar con ella
  } catch (err) {
    console.log(err)
    return { status: 500, error: err.message };
  }
};

