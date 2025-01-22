import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import genToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplications from "../models/JobApplication.js";

//reg a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({
      success: false,
      message:
        "[controller/companyController/registerCompany]: The request is not valid, ensure all the fields are filled before submitting the data.",
    });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message:
          "[controller/companyController/registerCompany]: The email already exists in the database.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const imageUpload = cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: (await imageUpload).secure_url,
    });
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: genToken(company._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: `[controller/companyController/registerCompany]: ${error.message}`,
    });
  }
};

//company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.json({
      success: false,
      message:
        "[controller/companyController/loginCompany]: Email and password are required.",
    });
  }

  try {
    const company = await Company.findOne({ email });

    // Check if company exists
    if (!company) {
      return res.json({
        success: false,
        message:
          "[controller/companyController/loginCompany]: User does not exist in the database. Please sign up to continue.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message:
          "[controller/companyController/loginCompany]: Invalid email or password.",
      });
    }

    // Successful login
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: genToken(company._id),
    });
  } catch (error) {
    console.error(
      "[controller/companyController/loginCompany]:",
      error.message
    );
    return res.json({
      success: false,
      message: `Error occurred: ${error.message}`,
    });
  }
};

//get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//post a new job
export const postNewJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;
  console.log(companyId, {
    title,
    description,
    location,
    salary,
    level,
    category,
  });

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      category,
      companyId,
      date: Date.now(),
      level,
    });
    await newJob.save();
    res.json({
      success: true,
      message: `Job Posted successfully!`,
      newJob,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `[controller/companyController/postNewJob]: ${error.message}`,
    });
  }
};

//get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    console.log(companyId);
    // console.log(req.headers);
    const applications = await JobApplications.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();
    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({
      success: false,
      message: `[controller/companyController/getCompanyJobApplicants]: ${error.message}`,
    });
  }
};

//get company posted jobs

export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    //TODO: adding no of applicants data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplications.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );
    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change company job status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    //find job application data and update the status
    await JobApplications.findOneAndUpdate({ _id: id }, { status });
    return res.json({ success: true, message: "Status has been Updated!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company?._id;

    // Log inputs for debugging
    console.log("Request Body:", req.body);
    console.log("Company ID:", companyId);

    // Find the job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check ownership
    if (job.companyId.toString() !== companyId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Toggle visibility
    job.visible = !job.visible;
    await job.save();

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
