//? Dependencies
import { Router } from "express";
import { limitGrt } from "../limit/rateLimit.js";
import conx from "../db/atlas.js";
import { proxyAutomovil } from "../middleware/proxyAutomovil.js";
import { dtoData } from "../middleware/proxyAutomovil.js";

const storageAutomovil = Router();

//? General Variables
let db = await conx();
let automovil = 
 db.collection("automovil");

//? Get automoviles
storageAutomovil.get("/", limitGrt(), proxyAutomovil, async (req, res) => {
  if (!req.rateLimit) return;

  let automoviles = await automovil.find({}).toArray();
  res.send(automoviles);
});

//? Add automoviles
storageAutomovil.post("/add", limitGrt(), proxyAutomovil, dtoData, async (req, res) => {
  if (!req.rateLimit) return;
  try {
    let newAutomovil = await automovil.insertOne(req.body);
    res.status(201).send({Added: newAutomovil})

  } catch(err) {
      res.status(422).send({Error: err.message})
  }

});

export default storageAutomovil;
