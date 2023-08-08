//? Dependencies
import rateLimit from 'express-rate-limit';

export const limitGrt = () => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req, res) => {
            const sizeLimit = process.env.LIMIT;
            const header = req.headers["content-length"];
            if (header > sizeLimit) {
                res.status(413).send({
                    message: "Payload too large"
                });
                return true;
            }
        },

        message: (req, res) => {
            res.status(429).send({
                message: "Too many requests"
            })
        }
    })
}