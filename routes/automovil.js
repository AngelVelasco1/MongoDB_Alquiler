//? Dependencies
import { limitGrt } from '../middleware/limit.js';
import { Router } from 'express';
import { SignJWT } from 'jose';
import { conx } from '../db/atlas.js'
import session from 'express-session';


const storageAutomovil = Router();

let db = await conx();
let automovil = db.collection("automovil")

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

        res.cookie('token', jwt, {status: 201});
        next();
    }
    catch(err) {
         res.status(401).send({
            Opps: err.message
        })
    }
})

//? Get automoviles
storageAutomovil.get('/', limitGrt(), async(req, res) => {
    if(!req.rateLimit) return; 

    let db = await conx();
    let automovil = db.collection("automovil");
    let result  = await automovil.find({}).toArray();

    res.send.json(result);
})

export default storageAutomovil;