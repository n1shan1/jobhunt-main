import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

export default function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  function handleOnSearch() {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    // console.log({
    //   title: titleRef.current.value,
    //   location: locationRef.current.value,
    // });
  }

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-10 text-center rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Apply ot over 1000+ jobs on the portal!
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your next big career move is right here at your fingertips!
        </p>
        <div className="flex items-center justify-between bg-white rounded-none text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto ">
          <div className="flex items-center">
            <img
              className="h-4 sm:h-5"
              src={assets.search_icon}
              alt={"Search Icon Logo!"}
            />
            <input
              type="text"
              placeholder="Search for jobs..."
              className="max-sm:xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center">
            <img
              className="h-4 sm:h-5"
              src={assets.location_icon}
              alt={"Search Icon Logo!"}
            />
            <input
              type="text"
              placeholder="Location..."
              className="max-sm:xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
            <button
              onClick={handleOnSearch}
              className="bg-blue-600 px-6 py-2 rounded text-white m-1"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-between gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="Company Logo" />
          <img className="h-6" src={assets.accenture_logo} alt="Company Logo" />
          <img className="h-6" src={assets.amazon_logo} alt="Company Logo" />
          <img className="h-6" src={assets.adobe_logo} alt="Company Logo" />
          <img className="h-6" src={assets.samsung_logo} alt="Company Logo" />
          <img className="h-6" src={assets.walmart_logo} alt="Company Logo" />
        </div>
      </div>
    </div>
  );
}
