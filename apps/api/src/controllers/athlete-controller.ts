import type { RequestHandler } from "express";

// TODO: Remove this controller (example only)

const ListeAthlete: RequestHandler = (req, res): void => {
    const { page, limit, filter } = req.query;
    res.json({ message: 'Liste des athlètes avec pagination et filtres', page, limit, filter });
}

const AthleteParID: RequestHandler = (req, res): void => {

    const { id } = req.params;
    res.json({ message: `Données de l'athlète avec ID ${id}` });
  
};

const TopAthlete: RequestHandler = (req, res): void => {
    res.json({ message: 'Top athlètes' });
};

const AthleteParPays: RequestHandler = (req, res): void => {

    const pays = req.params.pays;
    res.json({ message: `Données de l'athlète du  ${pays}` });
  
};


export default { ListeAthlete, AthleteParID , TopAthlete,AthleteParPays };