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

interface UpdateGymClassParams {
    gymClassId: string,
}

interface UpdateGymClassBody {
    title?: string,
    text?: string,
}

export const updateGymClass: RequestHandler<UpdateGymClassParams, unknown, UpdateGymClassBody, unknown> = async(req, res, next) => {
    const gymClassId = req.params.gymClassId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try{
        if (!mongoose.isValidObjectId(gymClassId)) {
            throw createHttpError(400, "Invalid Gym Class id");
        }
        if (!newTitle) {
            throw createHttpError(400, "Gym Class must have a title");
        }

        const gymClass = await GymClassModel.findById(gymClassId).exec();

        if (!gymClass) {
            throw createHttpError(404, "Gym Class not found");
        }

        gymClass.title = newTitle;
        gymClass.text = newText;

        const updatedGymClass = await gymClass.save();

        res.status(200).json(updatedGymClass);

    } catch (error) {
        next(error);
    }
};

export const deleteGymClass: RequestHandler = async(req, res, next) => {
    const gymClassId = req.params.gymClassId;
    try {
        if (!mongoose.isValidObjectId(gymClassId)) {
            throw createHttpError(400, "Invalid Gym Class id");
        }

        const gymClass = await GymClassModel.findById(gymClassId).exec();

        if (!gymClass){
            throw createHttpError(404, "Gym Class not found");
        }

        await gymClass.deleteOne();

        res.sendStatus(204);
    } catch (error){
        next(error);
    }
};