//? Dependencies
import express from "express";
import dotenv from "dotenv";
import { createToken, validateToken } from "./tokens/auth.js";
import conx from "./db/atlas.js";
import storageAutomovil from "./routes/automovil.js";
import storageCliente from "./routes/cliente.js";

//? Env
dotenv.config();

const app = express();
app.use(express.json());

//? Create Token
app.use("/create", createToken)

//? Routes 
app.use("/cliente", validateToken, storageCliente);
app.use("/automovil", validateToken,  storageAutomovil);

//? Server
const server = JSON.parse(process.env.SERVER);
(async() => {
  try {
    await conx();
    app.listen(server, () => {
      console.log(`http://${server.hostname}:${server.port}`);
    });
    
  } catch (err) {
    console.error({opps: err.message})
  }
})();



