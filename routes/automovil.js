//? Dependencies
import { limitGrt } from '../middleware/limit.js';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import { getDb } from '../db/atlas.js'
import { createToken, validateToken } from '../middleware/auth.js'

const storageAutomovil = Router();

storageAutomovil.get('/register/:_id', limitGrt(), async(req, res) => {
    if(!req.rateLimit) return;

})

export default storageAutomovil;