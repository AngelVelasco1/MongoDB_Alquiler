//? Dependencies
import { plainToClass, classToPlain } from 'class-transformer';
import { newInstance } from '../tokens/auth.js';
import { Params } from '../controller/params.js';
import { Router } from 'express';
import { validate } from 'class-validator';
import 'reflect-metadata';

const classVerify = Router();
const dtoData = Router();
const dtoParams = Router();

classVerify.use((req, res, next) => {
    try {
        let collectionName = req.collection;
        let {payload} = req.data;
        let { iat, exp, ...newPayload } = payload;
        payload = newPayload;

        let newClass = newInstance(collectionName);
    
        let Clone = JSON.stringify(classToPlain(plainToClass(newClass.class, {}, {ignoreDecorators: true})));
    
        let verifyClone = Clone === JSON.stringify(payload);

        delete req.data;
        (!verifyClone) ? res.status(406).send({status: 406, message: "Unauthorizated"}) : next();
    } catch(err) {
        res.send({Opps: err.message})
    }

});

dtoData.use(async (req, res, next) => {
    try {
        const collectionName = req.collection;
        let data = plainToClass(newInstance(collectionName).class, req.body);
        await validate(data);

        req.body = JSON.parse(JSON.stringify(data));
        delete req.data;
        next();

    } catch (err) {
        res.status(422).send({Error: err.message})
    }
})


dtoParams.use("/:id", async (req, res, next) => {
    try {
        let param = plainToClass(Params, req.params)
        await validate(param);
        next();

    } catch (err) {
        res.status(422).send({Error: err.message})
    }
})

export { classVerify, dtoData, dtoParams }