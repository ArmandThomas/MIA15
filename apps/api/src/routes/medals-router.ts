import { Router } from "express";
import { MedalsController } from "@/controllers/medals-controller.js";

const router = Router();

router.get("/by-athlete", MedalsController.findAllByAthlete);

export default router;
