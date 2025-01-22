import express from "express";
import { getAllJobs, getJobById } from "../controllers/jobController.js";

const jobRouter = express.Router();

//route to get all the jobs
jobRouter.get("/", getAllJobs);
//route to get single route by ID
jobRouter.get("/:id", getJobById);

export default jobRouter;
