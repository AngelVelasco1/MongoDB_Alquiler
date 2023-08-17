//? Dependencies
import { Router } from "express";
import { limitGrt } from "../limit/rateLimit.js";
import conx from "../db/atlas.js";
import { classVerify } from "../middleware/proxyCampus.js";

const storageAlquiler = Router();

//? General Variables
let db = await conx();
let alquiler = db.collection("alquiler");

//?  Obtener los detalles del alquiler con el ID_Alquiler específico. 
storageAlquiler.get('/:ID_alquiler', limitGrt(), classVerify, async(req, res) => {
    const alquilerID = parseInt(req.params.ID_alquiler);
    const specificAlquiler = await alquiler.findOne(
        { "ID_alquiler": alquilerID  }
        );

    res.status(200).send({Alquiler: specificAlquiler})
} )

export default storageAlquiler;
