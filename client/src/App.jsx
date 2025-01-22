import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  return (
    <>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <div>
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
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
