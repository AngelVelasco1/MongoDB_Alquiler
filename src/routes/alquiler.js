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
storageAlquiler.get('/:ID_alquiler', limitGrt(), classVerify, async (req, res) => {
    const alquilerID = parseInt(req.params.ID_alquiler);
    const specificAlquiler = await alquiler.findOne(
        { "ID_alquiler": alquilerID }
    );

    res.status(200).send({ Alquiler: specificAlquiler })
});

//? 8. Obtener el costo total de un alquiler específico. 
storageAlquiler.get('/total/:ID_alquiler', limitGrt(), classVerify, async (req, res) => {
    const alquilerID = parseInt(req.params.ID_alquiler);
    const totalAlquiler = await alquiler.aggregate([
        {
            $match: {
                ID_alquiler: { $eq: alquilerID }
            }
        },
        {
            $project: {
                "_id": 0,
                "ID_alquiler": 0,
                "ID_Automovil_id": 0,
                "ID_Cliente_id": 0,
                "Fecha_Inicio": 0,
                "Fecha_Fin": 0,
                "Fecha_Fin": 0,
                "Estado": 0
            }
        }
    ]).toArray();

    res.status(200).send(totalAlquiler)
});

storageAlquiler.get('/specificDate/:Fecha_Inicio', limitGrt(), classVerify, async (req, res) => {
    const startDate = new Date(req.params.Fecha_Inicio);
    const startAlquiler = await alquiler.findOne({ "Fecha_Inicio": startDate })

    res.status(200).send({Alquiler: startAlquiler})
});


export default storageAlquiler;
