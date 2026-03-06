import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/jobs.routes.js";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// CORS must come BEFORE routes
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://jobliyfy-frontend.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// routes
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`App is running at PORT ${PORT}`);
});
