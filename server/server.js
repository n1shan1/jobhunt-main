import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhook } from "./controllers/webhooks.js";
//init express
const app = express();

//db connection
await connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send({ msg: "Running" });
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhook);

//inits
const PORT = process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
