import "dotenv/config";
import express from "express";
import gymClassModel from "./models/gymClasses";

const app = express();

app.get("/", async (req, res) => {
    const gymClass = await gymClassModel.find().exec();
    res.status(200).json(gymClass);
});

export default app;