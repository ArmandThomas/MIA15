import type { RequestHandler } from "express";

const getMedalsByDiscipline: RequestHandler = (req, res) => {
    const { discipline_title } = req.params;
    res.json({ message: `Récupérer les médailles pour la discipline: ${discipline_title}` });
};

const getMedalsByGame: RequestHandler = (req, res) => {
    const { slug_game } = req.params;
    res.json({ message: `Récupérer les médailles pour le jeu: ${slug_game}` });
};

const getMedalsByEvent: RequestHandler = (req, res) => {
    const { event_title } = req.params;
    res.json({ message: `Récupérer les médailles pour l'événement: ${event_title}` });
};

const getMedalsByEventGender: RequestHandler = (req, res) => {
    const { event_gender } = req.params;
    res.json({ message: `Récupérer les médailles pour le genre d'événement: ${event_gender}` });
};

const getMedalsByMedalType: RequestHandler = (req, res) => {
    const { medal_type } = req.params;
    res.json({ message: `Récupérer les médailles pour le type de médaille: ${medal_type}` });
};

const getMedalsByParticipantType: RequestHandler = (req, res) => {
    const { participant_type } = req.params;
    res.json({ message: `Récupérer les médailles pour le type de participant: ${participant_type}` });
};

const getMedalsByAthlete: RequestHandler = (req, res) => {
    const { athlete_full_name } = req.params;
    res.json({ message: `Récupérer les médailles pour l'athlète: ${athlete_full_name}` });
};

const getMedalsByCountry: RequestHandler = (req, res) => {
    const { country_name } = req.params;
    res.json({ message: `Récupérer les médailles pour le pays: ${country_name}` });
};

export default { 
    getMedalsByDiscipline, 
    getMedalsByGame, 
    getMedalsByEvent, 
    getMedalsByEventGender, 
    getMedalsByMedalType, 
    getMedalsByParticipantType, 
    getMedalsByAthlete, 
    getMedalsByCountry 
};