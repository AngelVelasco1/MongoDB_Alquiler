//? Dependencies
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

//? Env
dotenv.config('../');

let db;

//? Atlas connection 
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.tfk8jyc.mongodb.net/`;
export const conx = async () => {
    let client;
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        client = new MongoClient(uri, options);
        await client.connect();

        db = client.db(process.env.ATLAS_DB);
    }
    catch (err) {
        console.error("Not connection found:", err.message);
    }
    finally {
        await client.close();
    }
}

//? Database
export const getDb = () => {
    return db;
}