import React, { useEffect, useContext, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);

  //function to fetch the company jib application data
  const fetchDataFromBackend = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleVisible = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.success);
        fetchDataFromBackend();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[75vh]">
        <p className="text-xl sm:text-2xl">No jobs available at the moment!</p>
      </div>
    ) : (
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  #
                </th>
                <th className="py-2 px-4 border-b text-left">Job Title</th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  Date
                </th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  Location
                </th>
                <th className="py-2 px-4 border-b text-center">Applications</th>
                <th className="py-2 px-4 border-b text-left">Visible</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b">{job.applicants}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      onChange={() => toggleVisible(job._id)}
                      checked={job.visible}
                      className="scale-125 ml-4"
                      type="checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 justify-end flex">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="text-white bg-black py-2 px-4 rounded"
          >
            Add New Job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ManageJobs;
