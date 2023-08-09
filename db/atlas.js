//? Dependencies
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

//? Env
dotenv.config('../');

let db;

//? Atlas connection 
export const conx = async() => {
    try {
        const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.tfk8jyc.mongodb.net/`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(uri, options);
        db = client.db(process.env.ATLAS_DB);

        return db;
    }
    catch(err) {
        return {status: 500, message: err};
    }
}

//? Database
export const getDb = () => {
    return db;
}