//? Dependencies
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createToken, validateToken } from "./tokens/auth.js";
import storageAutomovil from "./routes/automovil.js";
import storageCliente from "./routes/cliente.js";
import conx from "./db/atlas.js";

//? Env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

//? Create Token
app.use("/create", createToken, (req, res) => {
  return res.send({ token: req.token });
});

//? Routes 
app.use("/cliente", validateToken, storageCliente);
app.use("/automovil", validateToken, storageAutomovil);

//? Server
const server = JSON.parse(process.env.SERVER);
(async() => {
  try {
    await conx();
    app.listen(server, () => {
      console.log(`http://${server.hostname}:${server.port}`);
    });
    
  } catch (err) {
    console.log(err.message)
  }
})();



