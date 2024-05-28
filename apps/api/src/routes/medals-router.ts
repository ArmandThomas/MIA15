import { Router } from 'express';
import medalsController from '@/controllers/medals-controller.js';
const router = Router();

router.get('/discipline/:discipline_title', medalsController.getMedalsByDiscipline);

router.get('/game/:slug_game', medalsController.getMedalsByGame);

router.get('/event/:event_title', medalsController.getMedalsByEvent);

router.get('/event-gender/:event_gender', medalsController.getMedalsByEventGender);


router.get('/participant-type/:participant_type', medalsController.getMedalsByParticipantType);

router.get('/athlete/:athlete_full_name', medalsController.getMedalsByAthlete);

router.get('/country/:country_name', medalsController.getMedalsByCountry);

export default router;