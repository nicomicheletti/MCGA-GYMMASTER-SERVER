import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import gymClassesRoutes from "./routes/gymClasses";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/gymclasses", gymClassesRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Error: " + error;
    let statusCode = 500;
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;