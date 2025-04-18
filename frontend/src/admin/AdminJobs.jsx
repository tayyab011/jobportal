import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setsearchJobByText } from "../redux/jobSlice";
import useGetAllCompany from "../hooks/useGetAllCompany";


const AdminJobs = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();
 useGetAllCompany();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input]);
  return (
    <Layout>
      <div className="container mx-auto px-5 py-16">
        <div className="my-5 flex justify-between">
          <div>
            <label className="input validator ">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="email"
                placeholder="search companies"
                required
              />
            </label>
          </div>
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="btn btn-neutral "
          >
           Post New Jobs
          </button>
        </div>

        <AdminJobsTable/>
      </div>
    </Layout>
  );
};

export default AdminJobs;
