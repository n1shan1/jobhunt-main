import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhook } from "./controllers/webhooks.js";
import connectCloudinary from "./config/cloudinary.js";
import companyRouter from "./routes/companyRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
//init express
const app = express();

//db connection
await connectDB();
await connectCloudinary();

//middlewares
app.use(clerkMiddleware());
app.use(cors());
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("Api working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhook);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/users", userRouter);

//inits
const PORT = process.env.PORT || 8080;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`[server]: info: Server running on the port: ${PORT}`);
});
