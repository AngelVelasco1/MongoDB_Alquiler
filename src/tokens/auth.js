import 'reflect-metadata';
import { SignJWT, jwtVerify } from "jose";
import { plainToClass, classToPlain } from 'class-transformer';
import { Automovil } from '../controller/automovil.js';
import { Cliente } from '../controller/cliente.js'
import dotenv from 'dotenv'
import { Router } from 'express';

//? Env
dotenv.config('../../');

const createToken = Router();
const validateToken = Router();

/* Create a Class Instance  based on class name */
const newInstance = (className) => {
    // Mapping of ckass names to actual class contructors
    const match = {
        "automovil": Automovil,
        "cliente": Cliente
    };
    const Class = match[className]; // Get the class constructor
    // Create instance if valid class name
    if (Class) {
        return {atributes: plainToClass(Class, {}, { ignoreDecorators: true}), class: Class}
    } else {
        throw new Error("Invalid collection")
    }

}

createToken.use('/:collection', async (req, res) => { 
    try {
        const collection = req.params.collection; // Extract the collection name
        const classInst = newInstance(collection).atributes // Create an instance based on the collection name

        // If class instance not found return an error
        if(!classInst) return res.status(404).send({status: 400, error: "Collection not found"})
        // Translate string into bytes
        const encoder = new TextEncoder();
        // Assign the class instance as its payload
        const jwtConstructor = new SignJWT(Object.assign({}, classToPlain(classInst)));
        // Build the JWT with protected header, issuance time and expiration time
        const jwtData = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT"}) // Set the algorithm and token type
            .setIssuedAt() // Add the current time as the token's issuance time (iat)
            .setExpirationTime("1h") // Expiration time to 1 hour
            .sign(encoder.encode(process.env.PRIVATE_KEY)) // Sign the JWT usign private key encoding into bytes
        
        req.data = jwtData; // Attach JWT data to the request object

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
    const token = req.headers.authorization; // Get the tokne from the request header
    if(!token) return res.status(400).send({status: 400, token: "Not token found"});

    try {
        const encoder = new TextEncoder();
        // Verify the JWT using jwtVerify function and private key
        const jwtData = await jwtVerify(token, encoder.encode(process.env.PRIVATE_KEY));
        req.data = jwtData; // Attach the decoded JWT data to the request object
        next();
    } 
    catch (err) {
        res.status(498).send({
            token: "Token expired/invalid, create token again"
        })
    }
});

export { createToken, validateToken, newInstance }