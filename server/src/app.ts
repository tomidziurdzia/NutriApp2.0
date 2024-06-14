import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import doctorRouter from "./routes/doctor.routes";
import patientRouter from "./routes/patient.routes";
// import foodRouter from "./routes/food.router";
// import dailyDietRouter from "./routes/daily-diet.router";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.use("/api/doctor", doctorRouter);
app.use("/api/patient", patientRouter);
// app.use("/api/food", foodRouter);
// app.use("/api/daily-diet", dailyDietRouter);

const startServer = () => {
  const PORT = process.env.PORT ?? 8080;

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running and listening on http://localhost:${PORT}/`);
  });

  return server;
};

export default startServer;
