//? Dependencies
import rateLimit from 'express-rate-limit';

export const limitGrt = () => {
    return rateLimit({
        // Define el tiempo en ms en la que se aplicara el limite
        windowMs: 30 * 1000, // 30s
        // Define el limite de solicitudes detro de ese tiepo (30s)
        max: 5,
        // Definen si se deben utilizar las cabeceras de solicitud estándar o antiguas para realizar el seguimiento de las solicitudes.
        standardHeaders: true,
        legacyHeaders: false,
        // Funcion que determina si debemos omitir el limite para algunas solicitudes
        skip: (req, res) => {
            const sizeLimit = process.env.LIMIT;
            const headerLength = req.headers["content-length"];
            // Si el tamaño del contenido excede al limite, saltamos este limite
            if (headerLength > sizeLimit) {
                res.status(413).send({
                    message: `Payload too large. Maximum size allowed: ${sizeLimit}`
                });
                return true; // Saltamos el limite
            }
        },
        // Funcion que define el msg al exceder el limite de solicitudes
        message: (req, res) => {
             res.status(429).send({
                message: "Too many requests"
            })
        }
    })
}