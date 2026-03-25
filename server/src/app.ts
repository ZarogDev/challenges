import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";
import { globalErrorHandler } from "./middlewares/error-handler.middleware";
import { sanitizeXss } from "./middlewares/xss.middleware";

const app = express();

// ajoute quelques headers de sécurité
app.use(helmet());

// autorise le front local à appeler l'API
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// lire le JSON envoyé dans les requêtes
app.use(express.json());

// nettoie les données envoyées par le client
// app.use(sanitizeXss);

// petite route test
app.get("/", (_req, res) => {
  res.json({
    message: "API GamerChallenges",
    documentation: "Read our API documentation : /api/docs",
  });
});

// toutes les routes passent par /api
app.use("/api", routes);

// middleware d'erreur global à la fin
app.use(globalErrorHandler);

export default app;