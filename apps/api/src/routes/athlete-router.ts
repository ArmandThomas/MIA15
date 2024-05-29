import { Router } from "express";
import { athleteController } from "@/controllers/athlete-controller.js";

const router = Router();

// GET
router.get("/:id", athleteController.findAthlete);
router.get("/", athleteController.findAllAthletes);
// GET athletes by country
router.get("/country/:country", athleteController.findAthleteByCountry);

export default router;
