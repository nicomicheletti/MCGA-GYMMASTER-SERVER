import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import gymClassesRoutes from "./routes/gymClasses";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/gymclasses", gymClassesRoutes);

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