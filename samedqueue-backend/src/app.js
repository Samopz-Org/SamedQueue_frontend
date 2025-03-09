import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import { connectDB } from "./config/dbConfig.js";
import { ENVIRONMENT } from "./config/environment.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default app configurations
const port = ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/queue", queueRoutes);

// Start server
app.listen(port, async () => {
  console.log(`"${appName}" listening on port:${port}!`);
  await connectDB();
});
