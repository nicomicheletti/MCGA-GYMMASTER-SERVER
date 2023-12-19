import express from "express";
import * as GymClassesController from "../controllers/gymClasses";

const router = express.Router();

router.get("/", GymClassesController.getGymClasses);

router.get("/:gymClassId", GymClassesController.getGymClass);

router.post("/", GymClassesController.createGymClass);

router.patch("/:gymClassId", GymClassesController.updateGymClass);

router.delete("/:gymClassId", GymClassesController.deleteGymClass);

export default router;