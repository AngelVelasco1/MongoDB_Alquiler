//? Dependencies
import conx from "../db/atlas.js";
import { limitGrt } from '../limit/rateLimit.js';
import { Router } from 'express';
import { classVerify } from "../middleware/proxyCampus.js";

const storageCliente = Router();

//? General Variables
let db = await conx();
let cliente = db.collection("cliente");

//?  Mostrar todos los clientes registrados en la base de datos.
storageCliente.get('/', limitGrt(), classVerify, async (req, res) => {
    const clientes = await cliente.find({}).toArray()
    res.status(200).send(clientes)
})

//? Listar los clientes con el DNI específico.
storageCliente.get('/specific/:DNI', limitGrt(), classVerify, async (req, res) => {
    const dniClient = req.params.DNI;
    const specificClient = await cliente.aggregate([
        {
            $match: {
                DNI: { $eq: dniClient }
            }
        },
        {
            $project: {
                "ID_cliente": 0,
                "_id": 0
            }
        }
    ]).toArray();
    res.status(200).send({ Cliente: specificClient })
});

//? Obtener los datos de los clientes que realizaron al menos un alquiler.
storageCliente.get('/leastOne', limitGrt(), classVerify, async (req, res) => {
    const leatsOneClient = await cliente.aggregate([
        {
            $lookup: {
                from: "alquiler",
                localField: "ID_cliente",
                foreignField: "ID_Cliente_id",
                as: "Alquileres",
            }
        },
        {
            $unwind: "$Alquileres"
        },
        {
            $match: {
                Alquileres: { $exists: true, $ne: [], }
            }
        },
        {
            $group: {
                _id: "$ID_cliente",
                Cliente: { $first: "$$ROOT" }, // Usamos $$ROOT para mantener el documento completo del cliente
                Alquileres: { $push: "$Alquileres" } // Agrupamos las reservas en un arreglo
            }
        },
        {
            $project: {
                "_id": 0,
                "Cliente._id": 0,
                "Cliente.ID_cliente": 0,
                "Cliente.Alquileres": 0,
                "Alquileres._id": 0,
                "Alquileres.ID_alquiler": 0,
                "Alquileres.ID_Cliente_id": 0,
                "Alquileres.ID_Automovil_id": 0,
            }
        },
    
    ]).toArray();

    res.status(200).send({Clientes: leatsOneClient})
})

export default storageCliente;