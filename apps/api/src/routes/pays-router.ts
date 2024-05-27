import { Router } from "express";
import paysController from "@/controllers/pays-controller.js";

const router = Router();

router.get("/", paysController.getAll);
router.get("/:name", paysController.getOneByName);

export default router;