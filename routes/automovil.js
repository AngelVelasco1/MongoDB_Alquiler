//? Dependencies
import { limitGrt } from '../middleware/limit.js';
import { Router } from 'express';
import { SignJWT } from 'jose';
import { getDb } from '../db/atlas.js'
import session from 'express-session';


const storageAutomovil = Router();

//? Session (Cookies) */
storageAutomovil.use(session({
    secret: "cookie",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: false
    }
}));

storageAutomovil.use('/', async(req, res, next) => {
    try {
        const encoder = new TextEncoder();
        const payload = {
            body: req.body,
            params: req.params
        }

        const jwtConstructor = new SignJWT({payload});

        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.body = payload.body;
        req.session.jwt = jwt; 

        res.cookie('token', jwt);
        next();
    }
    catch(err) {
        res.sendStatus(500).send(err.message)
    }
})

//? Get automoviles
storageAutomovil.get('/', limitGrt(), async(req, res) => {
    const db = await getDb();

    const collection = db.collection('automovil');
    let automoviles  = await collection.find().toArray();

    res.json(automoviles);
})

export default storageAutomovil;