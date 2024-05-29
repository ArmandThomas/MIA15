import hostsControlleur from "@/controllers/host-controller.js";
import { Router } from "express";

const router = Router();

router.get("/", hostsControlleur.getAllHosts);

// Route pour récupérer un host par son game_slug
router.get("/:game_slug", hostsControlleur.getHostBySlug);

export default router;
