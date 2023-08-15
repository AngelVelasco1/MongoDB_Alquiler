//? Dependencies
import { Router } from "express";
import { limitGrt } from "../limit/rateLimit.js";
import conx from "../db/atlas.js";
import { proxyAutomovil } from "../middleware/proxyAutomovil.js";
import { dtoData } from "../middleware/proxyAutomovil.js";
import { rateLimit } from "express-rate-limit";

const storageAutomovil = Router();

//? General Variables
let db = await conx();
let automovil = db.collection("automovil");

//? Get automoviles
storageAutomovil.get("/", limitGrt(), proxyAutomovil, async (req, res) => {
  if (!req.rateLimit) return;
  try {
    let automoviles = await automovil.find({}).toArray();
    res.send(automoviles);
  } catch (err) {
    res.status(422).send({ Error: err.message });
  }
});

//? Add automoviles
storageAutomovil.post("/add", limitGrt(), proxyAutomovil, dtoData, async (req, res) => {
    if (!req.rateLimit) return;
    try {
      let newAutomovil = await automovil.insertOne(req.body);
      res.status(201).send({ Added: newAutomovil });
    } catch (err) {
      res.status(422).send({ Error: err.message });
    }
  }
);

//? Delete automoviles
storageAutomovil.delete("/remove/:id?", limitGrt(), proxyAutomovil, async (req, res) => {
    if (!req.rateLimit) return;

    try {
      const automovilID = parseInt(req.params.id);
      if (isNaN(automovilID)) return res.status(400).send({ Error: "Invalid Automovil id" });

      const automovilExist = await automovil.findOne({ "_id": automovilID });
      if(!automovilExist) return res.status(404).send({Error: "Automovil not found"})

      const automovilDeleted = await automovil.deleteOne({"_id": automovilID});
      res.status(200).send({ Deleted: automovilDeleted })
    } 
    catch (err) {
      res.status(422).send({ Error: err.message });
    }
  }
);

//? Update automoviles
storageAutomovil.patch("/update/:id?", limitGrt(), proxyAutomovil, dtoData, async (req, res) => {
  if (!req.rateLimit) return;

  try {
    const automovilID = parseInt(req.params.id);
    if (isNaN(automovilID)) {
      res.status(400).send({ Error: "Invalid Automovil id" });
      return;
    } 

    const automovilExist = await automovil.findOne({"_id": automovilID})
    if (!automovilExist) return res.status(404).send({Error: "Automovil not found"})

    if(req.body._id) return res.status(403).send({Error: "Id doesn't update"})

    const automovilChanged = await automovil.updateOne({"_id": automovilID}, {$set: req.body});
    res.status(200).send({ Automovil: automovilChanged })
    
  } catch (err) {
    res.status(422).send({ Error: err.message });

  }
});

// ? Obtener automoviles listos para alquiler
storageAutomovil.get("/available", limitGrt(), proxyAutomovil, async (req, res) => {
  if(!req.rateLimit) return;

  try {
    const availableCars = await automovil.aggregate([
      {
          $lookup: {
              from: "alquiler",
              localField: "_id",
              foreignField: "ID_Automovil_id",
              as: "Alquileres",
          }
      },
      {
          $project: {
              "ID_automovil_id": 0,
              "Alquileres.ID_Alquiler": 0,
              "Alquileres.ID_Automovil_id": 0,
              "Alquileres.ID_Cliente_id": 0
          }
      },
      {
          $unwind: "$Alquileres"
      },
      {
          $match: {
              Alquileres: { $exists: true, $ne: [] }
          }
      }
  
    ]).toArray();
    res.status(200).send({Available: availableCars})

  } catch(err) {
    res.status(500).send({Error: err.message})
  }
})

storageAutomovil.get("/available", limitGrt(), proxyAutomovil, async (req, res) => {
  if(!req.rateLimit) return;

  try {
    const availableCars = await automovil.aggregate([
      {
          $lookup: {
              from: "alquiler",
              localField: "_id",
              foreignField: "ID_Automovil_id",
              as: "Alquileres",
          }
      },
      {
          $project: {
              "ID_automovil_id": 0,
              "Alquileres.ID_Alquiler": 0,
              "Alquileres.ID_Automovil_id": 0,
              "Alquileres.ID_Cliente_id": 0
          }
      },
      {
          $unwind: "$Alquileres"
      },
      {
          $match: {
              Alquileres: { $exists: true, $ne: [] }
          }
      }
  
    ]).toArray();
    res.status(200).send({Available: availableCars})

  } catch(err) {
    res.status(500).send({Error: err.message})
  }
});

 //? Cantidad total de automoviles de cada sucursal
 storageAutomovil.get("/total", limitGrt(), proxyAutomovil, async (req, res) => {
  if(!req.rateLimit) return;

  try {
    const totalCars = await automovil.aggregate([

      {
          $lookup: {
              from: "sucursal_automovil",
              localField: "_id",
              foreignField: "ID_Sucursal_id",
              as: "Sucursal"
          }
      },
      {
          $unwind: "$Sucursal"
      },
      {
          $project: {
              "_id": 0,
              "Sucursal._id": 0,
              "Sucursal.ID_Automovil_id": 0,
              "Sucursal.Name": 0,
          }
      }
    ]).toArray();
    res.status(200).send({Automoviles: totalCars})

  } catch(err) {
    res.status(500).send({Error: err.message})
  }
});

//? Mostrar todos los automOviles con una capacidad mayor a 5
storageAutomovil.get("/greaterCapacity", limitGrt(), proxyAutomovil, async (req, res) => {
  if(!req.rateLimit) return;

  try {
    const greaterCapacity = await automovil.find({ Capacidad: { $gt: 5 } }).toArray();
    res.status(200).send({Automoviles: greaterCapacity});

  } catch(err) {
    res.status(500).send({Error: err.message})
  }
});

export default storageAutomovil;
