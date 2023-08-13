import 'reflect-metadata';
import { SignJWT, jwtVerify } from "jose";
import { plainToClass, classToPlain } from 'class-transformer';
import { Automovil } from '../controller/automovil.js'
import dotenv from 'dotenv'
import { Router } from 'express';

//? Env
dotenv.config('../');

const createToken = Router();
const validateToken = Router();

const newInstance = (className) => {
    const match = {
        'automovil': Automovil
    };
    const Class = match[className];
    return (Class) ? plainToClass(Class, {}, { ignoreDecorators: true}) : undefined;
}

createToken.use('/:collection', async (req, res) => { 
    try {
        const collection = req.params.collection;
        const classInst = newInstance(collection)

        if(!classInst) return res.status(404).send({status: 400, error: "Collection not found"})

        const encoder = new TextEncoder();
        const jwtConstructor = new SignJWT(Object.assign({}, classToPlain(classInst)));

        const jwtData = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT"})
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.PRIVATE_KEY))
        
        req.data = jwtData;

        res.status(201).send({status: 201, token: jwtData})
    } 
    catch(err) {
        res.status(404).send({
            status: 404,
            Error: "Invalid token"
        })
    }
});

validateToken.use('/', async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).send({status: 400, token: "Not token found"});

    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(token, encoder.encode(process.env.PRIVATE_KEY));
        req.data = jwtData;
        next();
    } 
    catch (err) {
        res.status(498).send({
            token: "Token expired/invalid, create token again"
        })
    }
});

export { createToken, validateToken }