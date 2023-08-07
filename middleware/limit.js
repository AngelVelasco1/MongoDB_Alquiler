//? Dependencies
import rateLimit from 'express-rate-limit';

export const limitGrt = () => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req, res) => {
            if (req.headers["content-length"] > 91) {
                 res.status(413).send({
                    message: "Limit length 91"
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