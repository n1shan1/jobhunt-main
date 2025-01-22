import Job from "../models/Job.js";

//get all the jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get sing job by id
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (!job) {
      return res.json({
        success: false,
        message: "[controllers/jobController/getJobByID]: Job Not Found",
      });
    }
    return res.json({ success: true, job });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
