import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/error-handler.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Remplacez par l'URL de votre frontend
}));
app.use(express.json());

// route test
app.get("/", (req, res) => {
  res.json({ message: "API GamerChallenges" });
});

// toutes les routes passent par /api
app.use("/api", routes);

app.use(globalErrorHandler);

export default app;