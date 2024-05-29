import type { RequestHandler } from "express";

const getAllHosts: RequestHandler = (req, res) => {
  res.json({ message: " tous les hosts" });
};

const getHostBySlug: RequestHandler = (req, res) => {
  const { game_slug } = req.params;

  res.json({ message: `Récupérer un host avec game_slug: ${game_slug}` });
};

export default { getAllHosts, getHostBySlug };
