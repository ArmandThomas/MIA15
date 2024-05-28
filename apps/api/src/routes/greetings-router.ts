import { Router } from "express";
import { greetingsController } from "@/controllers/greetings-controller.js";

const router = Router();

router.get("/", greetingsController.sayHello);
router.get("/:name", greetingsController.greet);

export default router;
