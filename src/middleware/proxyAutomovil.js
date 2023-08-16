//? Dependencies
import { plainToClass, classToPlain } from 'class-transformer';
import { Automovil } from '../controller/automovil.js';
import { Router } from 'express';
import { validate } from 'class-validator';
import 'reflect-metadata';

const proxyAutomovil = Router();
const dtoData = Router();


proxyAutomovil.use((req, res, next) => {
    try {
        let {payload} = req.data;
        const { iat, exp, ...newPayload } = payload;
        payload = newPayload;
    
        let Clone = classToPlain(plainToClass(Automovil, {}, {ignoreDecorators: true}));
    
        let verifyClone = JSON.stringify(Clone) === JSON.stringify(payload);
    
        (!verifyClone) ? res.status(406).send({status: 406, message: "Unauthorizated"}) : next();
    } catch(err) {
        res.send({Opps: err.message})
    }

});

dtoData.use(async (req, res, next) => {
    try {
        let data = plainToClass(Automovil, req.body);
        await validate(data);

        req.body = JSON.parse(JSON.stringify(data));
        delete req.data;

        next();

    } catch (err) {
        res.status(422).send({Error: err.message})
    }
})

export { proxyAutomovil, dtoData }