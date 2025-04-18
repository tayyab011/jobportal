 import React, { useEffect } from "react";
import axios from "axios";
import { successtoast } from "../helper/helper";
import { useDispatch } from "react-redux";
import { setallAdminJobs, setAllJobs } from "../redux/jobSlice";
const base_url = "http://localhost:8000/api";
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      const fetchAllAdminJobs = async () => {
        try {
          const result = await axios.get(`${base_url}/getAdminsJob`, {
            withCredentials: true,
          });
          if (result.data.success) {
           /*  successtoast(result.data.message); */
            dispatch(setallAdminJobs(result.data.jobs));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllAdminJobs();
    })();
  }, []);
};

export default useGetAllAdminJobs;
 