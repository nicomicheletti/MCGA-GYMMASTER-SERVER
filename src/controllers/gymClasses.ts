import { RequestHandler } from "express";
import GymClassModel from "../models/gymClasses";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getGymClasses: RequestHandler = async (req, res, next) => {
    try {
        const gymClasses = await GymClassModel.find().exec();
        res.status(200).json(gymClasses);
    } catch (error) {
        next(error);
    }
};

export const getGymClass: RequestHandler = async (req, res, next) => {
    const gymClassId = req.params.gymClassId;
    
    try {
        if (!mongoose.isValidObjectId(gymClassId)){
            throw createHttpError(400, "Invalid gym class id");
        }

        const gymClass = await GymClassModel.findById(gymClassId).exec();

        if(!gymClass) {
            throw createHttpError(404, "Gym class not found");
        }

        res.status(200).json(gymClass);

    } catch (error) {
        next(error);
    }
};

interface CreateGymClassBody {
    title?: string;
    text?: string;
}

export const createGymClass: RequestHandler<unknown, unknown, CreateGymClassBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if(!title) {
            throw createHttpError(400, "Title is required");
        }
        
        const newGymClass = await GymClassModel.create({ 
            title: title,
            text: text,
        });
        res.status(201).json(newGymClass);
    } catch (error) {
        next(error);
    }
};