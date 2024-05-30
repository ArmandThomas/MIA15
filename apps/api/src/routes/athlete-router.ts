import { Router } from "express";
import { AthleteController } from "@/controllers/athlete-controller.js";

const router = Router();

// GET
router.get("/", AthleteController.findAllAthletes);
router.get("/:id", AthleteController.findAthlete);
// GET athletes by country
// router.get("/country/:country", athleteController.findAthleteByCountry);

export default router;
