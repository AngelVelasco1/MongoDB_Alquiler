//? Dependencies
import { Router } from "express";
import { limitGrt } from "../limit/rateLimit.js";
import conx from "../db/atlas.js";
import { proxyAutomovil } from "../middleware/proxyAutomovil.js";
import { dtoData } from "../middleware/proxyAutomovil.js";

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
storageAutomovil.delete("/remove/:id?",
  limitGrt(),
  proxyAutomovil,
  async (req, res) => {
    if (!req.rateLimit) return;

    try {
      if (!parseInt(req.params.id)) {
        res.status(404).send({ Error: "Not Automovil found" });
      } else {
        let automovilDeleted = await automovil.deleteOne({ "ID_automovil": parseInt(req.params.id) });
        res.status(200).send({ Deleted: automovilDeleted })
      }

    } catch (err) {
      res.status(422).send({ Error: err.message });
    }
  }
);

//? Update automoviles
storageAutomovil.patch("/update/:id?", limitGrt(), proxyAutomovil, dtoData, async (req, res) => {
  if (!req.rateLimit) return;

  try {
    if (!parseInt(req.params.id)) {
      res.status(404).send({ Error: "Not Automovil found" });
    } else {
      let automovilChanged = await automovil.updateOne({ "ID_automovil": parseInt(req.params.id) }, {$set: req.body});
      res.status(200).send({ Automovil: automovilChanged })
    }
  } catch (err) {
    res.status(422).send({ Error: err.message });

  }
});

export default storageAutomovil;
