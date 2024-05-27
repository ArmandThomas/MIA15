import express from "express";
import greetingsRouter from "@/routes/greetings-router.js";
import { env } from "./env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Index" });
});

app.use("/greetings", greetingsRouter);

app.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
  console.log(`Server is running on http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});

app.on("error", (error) => {
  console.error("Server error", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection", error);
});
