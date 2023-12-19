import { RequestHandler } from "express";
import GymClassModel from "../models/gymClasses";

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
        const gymClass = await GymClassModel.findById(gymClassId).exec();
        res.status(200).json(gymClass);
    } catch (error) {
        next(error);
    }
};

export const createGymClass: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newGymClass = await GymClassModel.create({ 
            title: title,
            text: text,
        });
        res.status(201).json(newGymClass);
    } catch (error) {
        next(error);
    }
};