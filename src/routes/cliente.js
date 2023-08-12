//? Dependencies
import { limitGrt } from '../limit/rateLimit.js';
import { Router } from 'express';

const storageCliente = Router();

storageCliente.get('/', limitGrt(), async(req, res) => {
    if(!req.rateLimit) return;
    res.send("Respuesta exitosa");
})

storageCliente.post('/register', (req, res) => {
    
})

export default storageCliente;