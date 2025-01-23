import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply-job/${job._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <img
          className="h-10 w-10 rounded-md object-contain"
          src={job.companyId.image}
          alt="company logo"
        />
        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
          {job.type || "Full Time"}
        </span>
      </div>

      <h4 className="font-semibold text-xl text-gray-800 mb-3">{job.title}</h4>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span className="text-sm">{job.level}</span>
        </div>
      </div>

      <p
        className="text-gray-500 text-sm mb-4 flex-grow"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150) + "...",
        }}
      />

      <div className="flex gap-3 mt-auto">
        <button
          onClick={handleApply}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
        <button
          onClick={handleApply}
          className="flex-1 border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
