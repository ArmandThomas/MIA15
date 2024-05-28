import athleteControlleur from '@/controllers/athlete-controller.js';
import { Router} from 'express';


const router = Router();

// GET 
router.get("/", athleteControlleur.ListeAthlete);

// GET 
router.get("/id", athleteControlleur.AthleteParID);

// GET /athletes/top 
router.get('/top', athleteControlleur.TopAthlete);

// GET /athletes/pays/:pays
router.get('/pays/:pays', athleteControlleur.AthleteParPays)

export default router;