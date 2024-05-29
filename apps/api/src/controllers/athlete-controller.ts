import { AthleteService } from "@/services/Athlete-service.js";
import type { RequestHandler } from "express";
import { z } from "zod";


// TODO: Remove this controller (example only)


const findAthlete: RequestHandler = async (req, res, next) => {
    const athleteId = z.coerce.number().safeParse(req.params.id);
  
    if (!athleteId.success) {
      res.status(400).json({ error: "Invalid request body" });
      return next();
    }
  
    const athlete = await AthleteService.findOne(athleteId.data);
  
    if (!athlete) {
      res.status(404).json({ error: "athlete not found" });
      return next();
    }
  
    res.json(athlete);
    next();
  };



const findAllAthletes: RequestHandler = async (req, res, next) => {
    const athletes = await AthleteService.findAll();
    res.json(athletes);
    next();
};

const findAthleteByCountry: RequestHandler = async (req, res, next) => {
    const idCountry = z.coerce.string().safeParse(req.params.idCountry);

    if (!idCountry.success) {
        res.status(400).json({ error: "Invalid request body" });
        return next();
    }

    const athletes = await AthleteService.findByCountry(idCountry.data);
    
    res.json(athletes);
    next();
};


export const athleteController = {
    findAthlete,
    findAllAthletes,
    findAthleteByCountry,
};


  








