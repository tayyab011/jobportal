/* import React, { useEffect } from "react";
import axios from "axios";
import { successtoast } from "../helper/helper";
import { useDispatch } from "react-redux";
import {  setSingleJob } from "../redux/jobSlice";
const base_url = "http://localhost:8000/api";



const useGetSingleJobs = (jobId) => {
const dispatch = useDispatch();


useEffect(() => {
  (() => {
    const fetchSingleJobs = async () => {
      try {
        const result = await axios.get(`${base_url}/getJobById/${jobId}`, {
          withCredentials: true,
        });
        if (result.data.success) {
          successtoast(result.data.message);
          dispatch(setSingleJob(result.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  })();
}, []);


};

export default useGetSingleJobs;
 */