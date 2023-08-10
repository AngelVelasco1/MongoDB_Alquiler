//? Dependencies 
import express from 'express';
import dotenv from 'dotenv';
import { conx } from './db/atlas.js';
import { createToken, validateToken } from './middleware/auth.js';
import cookieParser from 'cookie-parser'
import storageAutomovil from './routes/automovil.js';
import storageCliente from './routes/cliente.js';

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

//? Jwt 
app.get("/create", createToken, (req, res) => {
    res.send({ token: req.token })
})

//? Env
dotenv.config();

//? Routes
app.use('/cliente', validateToken, storageCliente);
app.use('/automovil', validateToken, storageAutomovil);


//? Server
const server = JSON.parse(process.env.SERVER);
(async () => {
    try {
        await conx();
        app.listen(server, () => {
            console.log(`http://${server.hostname}:${server.port}`);
        })

    } catch (err) {
        console.error("Server error:", err.message);
    }
})();


