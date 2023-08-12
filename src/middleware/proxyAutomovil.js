//? Dependencies
import { plainToClass, classToPlain } from 'class-transformer';
import { Automovil } from '../controller/automovil.js';
import { Router } from 'express';
import { validate } from 'class-validator';
import 'reflect-metadata';

const proxyAutomovil = Router();
const dtoData = Router();

proxyAutomovil.use(async (req, res, next) => {
    let { payload } = req.data;
    const { iat, exp, ...newPayload } = payload;
    payload = newPayload;

    let Clone = JSON.stringify(classToPlain(plainToClass(Automovil, {}, {ignoreDecorators: true})));

    let verifyClone = Clone === JSON.stringify(payload);

    (!verifyClone) ? res.status(406).send({status: 406, message: "Unauthorizated"}) : next();
});

dtoData.use(async (req, res, next) => {
    try {
        let data = plainToClass(Automovil, req.data);
        await validate(data);

        req.body = JSON.parse(JSON.stringify(data));
        delete req.data;

        next();

    } catch (err) {
        res.status(err.status).send({Error: err.message})
    }
})

export { proxyAutomovil, dtoData }