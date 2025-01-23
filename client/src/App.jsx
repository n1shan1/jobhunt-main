import React, { useContext, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import RecruiterLogin from "./components/RecruiterLogin";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));
const ApplyJob = lazy(() => import("./pages/ApplyJob"));
const Applications = lazy(() => import("./pages/Applications"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddJob = lazy(() => import("./pages/AddJob"));
const ManageJobs = lazy(() => import("./pages/ManageJobs"));
const ViewApplications = lazy(() => import("./pages/ViewApplications"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Recruiters = lazy(() => import("./pages/Recruiters"));
const Contact = lazy(() => import("./pages/Contact"));
const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div>
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/dashboard" element={<Dashboard />}>
              {companyToken ? (
                <>
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="manage-job" element={<ManageJobs />} />
                  <Route
                    path="view-applications"
                    element={<ViewApplications />}
                  />
                </>
              ) : null}
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
