import { RequestHandler } from "express";

export const upload: RequestHandler = (req, res) => {
    console.log(req.file);
    res.send("Hello World");
};