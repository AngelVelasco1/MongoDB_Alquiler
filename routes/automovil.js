//? Dependencies
import { limitGrt } from '../middleware/limit.js';
import { conx } from '../db/atlas.js';
import { Router } from 'express';

const storageAutomovil = Router();

storageAutomovil.get('/', limitGrt(), async(req, res) => {
    if(!req.rateLimit) return;

    res.send("Respuesta exitosa");
})

export default storageAutomovil;