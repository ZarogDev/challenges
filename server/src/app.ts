import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { globalErrorHandler } from "./middlewares/error-handler.middleware";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Remplacez par l'URL de votre frontend
}));
app.use(express.json());

// route test
app.get("/", (req, res) => {
  res.json({ message: "API GamerChallenges", documentation: "Read our API documentation : /api/docs" });
});

// toutes les routes passent par /api
app.use("/api", routes);

app.use(globalErrorHandler);

export default app;