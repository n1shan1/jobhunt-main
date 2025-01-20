import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { searchFilter, isSearched, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };
  const filteredJobs = useMemo(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    return jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className="mb-4">
            <h3 className="font-medium text-lg">Current Search</h3>
            <div className="text-gray-500">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1 rounded">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="clear title filter"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2 bg-red-50 px-4 py-1 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="clear location filter"
                  />
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 border border-gray-500 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-500">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="scale-125"
                />
                {category}
              </li>
            ))}
          </ul>
          <h4 className="font-medium text-lg py-4 pt-14">
            Search by Locations
          </h4>
          <ul className="space-y-4 text-gray-500">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="scale-125"
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 px-4">
        <h3 className="font-medium text-3xl mb-2">Latest Jobs</h3>
        <p className="mb-6">Get your dream jobs at your fingertips</p>
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 6 && (
          <div className="flex justify-center mt-10 space-x-2">
            <img
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              src={assets.left_arrow_icon}
              alt="Previous Page"
              className="cursor-pointer"
            />
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
            <img
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filteredJobs.length / 6))
                )
              }
              src={assets.right_arrow_icon}
              alt="Next Page"
              className="cursor-pointer"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
