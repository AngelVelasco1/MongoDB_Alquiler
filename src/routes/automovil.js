//? Dependencies
import { Router } from "express";
import { limitGrt } from "../limit/rateLimit.js";
import { conx } from "../db/atlas.js";
import { proxyAutomovil } from "../middleware/proxyAutomovil.js";
import { dtoData } from "../middleware/proxyAutomovil.js";
const storageAutomovil = Router();

//? Get automoviles
storageAutomovil.get("/", limitGrt(), proxyAutomovil, async (req, res) => {
  if (!req.rateLimit) return;
  let db = await conx();
  let automovil = await db.collection("automovil");
  let automoviles = await automovil.find().toArray();
  res.send(automoviles);
});

//? Add automoviles
storageAutomovil.post("/add", limitGrt(), proxyAutomovil, dtoData, async (req, res) => {

});
export default storageAutomovil;
