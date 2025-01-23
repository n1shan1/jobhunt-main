import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getAllCompanyData,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postNewJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const companyRouter = express.Router();

//register the company
companyRouter.post("/register", upload.single("image"), registerCompany);

//company login
companyRouter.post("/login", loginCompany);

// PROTECTED ROUTES GOES BELOW
//get company data
companyRouter.get("/company", protectCompany, getCompanyData);

//post a job
companyRouter.post("/post-job", protectCompany, postNewJob);

//get applicants data of company
companyRouter.get("/applicants", protectCompany, getCompanyJobApplicants);

//get company job list
companyRouter.get("/list-jobs", protectCompany, getCompanyPostedJobs);

//change application status
companyRouter.post(
  "/change-status",
  protectCompany,
  changeJobApplicationStatus
);

//change application visibility
companyRouter.post("/change-visibility", protectCompany, changeVisibility);

companyRouter.get("/recruiters", getAllCompanyData);

export default companyRouter;
