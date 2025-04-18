import React, { useEffect } from "react";
import axios from "axios";
import { successtoast } from "../helper/helper";
import { useDispatch } from "react-redux";

import { setSingleCompany } from "../redux/companySlice";
import { setAllAppliedJobs } from "../redux/jobSlice";
const base_url = "http://localhost:8000/api";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      const fetchAppliedJobs = async () => {
        try {
          const result = await axios.get(`${base_url}/getApplyJobs`,
            {
              withCredentials: true,
            }
          );
          if (result.data.success) {
        /*     successtoast(result.data.message); */
            dispatch(setAllAppliedJobs(result.data.application));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAppliedJobs();
    })();
  }, []);
};

export default useGetAppliedJob;
