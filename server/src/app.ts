import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import doctorRouter from "./routes/doctor.routes";
import patientRouter from "./routes/patient.routes";
import chatRouter from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.use("/api/doctor", doctorRouter);
app.use("/api/patient", patientRouter);
app.use("/api/chat", chatRouter);

const startServer = () => {
  const PORT = process.env.PORT ?? 8080;

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running and listening on http://localhost:${PORT}/`);
  });

  return server;
};

export default startServer;
