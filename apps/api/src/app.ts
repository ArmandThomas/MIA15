import express from "express";
import greetingsRouter from "@/routes/greetings-router.js";
import countryRouter from "@/routes/country-router.js";
import athleteRouter from "@/routes/athlete-router.js";
import hostRouter from "@/routes/host-router.js";
import medalsRouter from "@/routes/medals-router.js"
import { env } from "./env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Remove this route (example only)
app.get("/", (req, res) => {
  res.json({ message: "Index" });
});

app.use("/greetings", greetingsRouter);
app.use("/country", countryRouter);
app.use("/athlete", athleteRouter )
app.use("/hosts" , hostRouter)
app.use("/medals" , medalsRouter)

app.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
  console.log(`Server is running on http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});

app.on("error", (error) => {
  console.error("Server error", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection", error);
});
