//? Dependencies 
import express from 'express';
import dotenv from 'dotenv';
import storageAutomovil from './routes/automovil.js';

const app = express();
app.use(express.json()); 
app.use(express.text());

//? Routes
app.use('/automovil', storageAutomovil);

//? Env
dotenv.config();

//? Server
const server = JSON.parse(process.env.SERVER);
app.listen(server, () => {
    console.log(`http://${server.hostname}:${server.port}`);
})

