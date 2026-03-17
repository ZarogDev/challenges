import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// route test
app.get("/", (req, res) => {
  res.json({ message: "API GamerChallenges" });
});

// toutes les routes passent par /api
app.use("/api", routes);

export default app;