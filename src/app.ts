import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import GymClassModel from "./models/gymClasses";

const app = express();

app.get("/", async (req, res, next) => {
    try {
        const gymClasses = await GymClassModel.find().exec();
        res.status(200).json(gymClasses);
        
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Error: " + error;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ error: errorMessage });
});

export default app;