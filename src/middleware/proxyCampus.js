//? Dependencies
import { plainToClass, classToPlain } from 'class-transformer';
import { newInstance } from '../tokens/auth.js';
import { Params } from '../controller/params.js';
import { Router } from 'express';
import { validate } from 'class-validator';
import 'reflect-metadata';

const classVerify = Router();
const dtoData = Router();

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


const dtoParams = async (req, res, next) => {
    try {
        let param = plainToClass(Params, req.params, {excludeExtraneousValues: true})
        await validate(param);
        console.log(param)
        next();

    } catch (err) {
        res.status(422).send({status: 422, message: err.message})
    }
}
export { classVerify, dtoData, dtoParams }