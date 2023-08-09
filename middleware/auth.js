import { SignJWT,jwtVerify } from "jose";
import dotenv from 'dotenv'

//? Env
dotenv.config('../');

export const createToken = async (req, res, next) => {
    try {
        const encoder = new TextEncoder();
        const jwtConstructor = new SignJWT({});

        req.token = await jwtConstructor
            .setProtectedHeader({
                alg: "HS256",
                typ: "JWT"
            })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.PRIVATE_KEY))
        
        next();
    } 
    catch(err) {
        res.send({
            opps: err.message
        })
    }
}

export const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) return res.sendStatus(401).send({jwt: "Not token found"});

    try {
        const encoder = new TextEncoder()

    } catch (err) {
        res.status(401).send({
            token: "Unexpected error, create token again"
        })
    }
}