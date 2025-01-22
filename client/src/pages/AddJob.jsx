import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Chennai");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          salary,
          location,
          category,
          level,
        },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Initialize Quill once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });

      // // Listen to changes in Quill editor
      // quillRef.current.on("text-change", () => {
      //   setDescription(quillRef.current.root.innerHTML); // Update description
      // });
    }
  }, []);

  return (
    <form
      className="container p-4 flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div className="w-full ">
        <p className="mb-2">Job title</p>
        <input
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Type Here..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="w-full max-w-lg">
        <p children="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            value={category}
            name=""
            id=""
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2"> Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            value={location}
            name=""
            id=""
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((loc, index) => (
              <option value={loc} key={index}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            value={level}
            name=""
            id=""
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>
      <div>
        <p className="mb-2">Job Salary</p>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
          value={salary}
          placeholder="00)0"
          type="number"
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <button
        className="w-28 py-3 mt-4 bg-black text-white rounded"
        onClick={() => {}}
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
