import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import { useParams } from 'react-router-dom';

import { errortoast, successtoast } from '../helper/helper';
import { setSingleJob } from '../redux/jobSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const base_url = "http://localhost:8000/api";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const parems = useParams();
  const jobId = parems.id;

/*    const isInitiallyApplied = singleJob.applications.some(
   (application) => application.applicant === user._id) || false;  */
  const [isApplied, setIsApplied] = useState(false);
  const applyJobHandler = async () => {
    try {
      const result = await axios.get(`${base_url}/applyJob/${jobId}`, {
        withCredentials: true,
      });

      if (result.data.success) {
        setIsApplied(true);

        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }]
        };
        dispatch(setSingleJob(updateSingleJob));
        successtoast(result.data.message);
      }
    } catch (error) {
      errortoast(error.response?.data.message);
    
    }
  };

  useEffect(() => {
    (() => {
      const fetchSingleJobs = async () => {
        try {
          const result = await axios.get(`${base_url}/getJobById/${jobId}`, {
            withCredentials: true,
          });
          if (result.data.success) {
          /*   successtoast(result.data.message); */
            dispatch(setSingleJob(result.data.job));
            setIsApplied(
              result.data.job.applications.some(
                (application) => application.applicant === user._id
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleJobs();
    })();
  }, [jobId, dispatch, user?._id]);

  if (singleJob) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-5 ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl mb-5  font-bold hanken">
                {singleJob.title}
              </h1>
              <div className="card-actions justify-start items-center">
                <div className="badge badge-primary badge-sm">
                  {singleJob.position}
                </div>
                <div className="badge badge-neutral badge-sm">
                  {singleJob.jobType}
                </div>
                <div className="badge badge-secondary badge-sm">
                  {singleJob.salary}
                </div>
              </div>
            </div>

            {/*   <button className="mt-5">
               {" "}
               {isApplied ? (
                 <button
                   onClick={isApplied}
                   className="btn btn-primary cursor-not-allowed "
                 >
                   Already Applied
                 </button>
               ) : (
                 <button className="btn btn-secondary"> Apply Now</button>
               )}{" "}
             </button> */}
            {isApplied ? (
              <button
                disabled
                className="btn bg-green-100 text-amber-800 border border-amber-400 cursor-not-allowed"
              >
                 Already Applied
              </button>
            ) : (
              <button
                onClick={applyJobHandler}
                className="btn bg-green-600 hover:bg-green-700 text-white border-0"
              >
                Apply Now
              </button>
            )}
          </div>
          <h1 className="text-3xl my-6 hanken">Job Description</h1>
          <hr />
          <div className="my-4">
            <h1 className="font-bold my-1">
              Role:
              <span className="ml-4 font-extralight">{singleJob.title}</span>
            </h1>
            <h1 className="font-bold my-1">
              Location:
              <span className="ml-4 font-extralight">{singleJob.location}</span>
            </h1>
            <h1 className="font-bold my-1">
              {" "}
              Description:
              <span className="ml-4 font-extralight">
                {" "}
                {singleJob.description}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              {" "}
              Experience:
              <span className="ml-4 font-extralight">
                {singleJob.experienceLevel} years
              </span>
            </h1>
            <h1 className="font-bold my-1">
              {" "}
              Salary:
              <span className="ml-4 font-extralight">
                {singleJob.salary} BDT
              </span>
            </h1>
            <h1 className="font-bold my-1">
              {" "}
              Total Applicants:
              <span className="ml-4 font-extralight">
                {singleJob.applications.length}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              {" "}
              date:
              <span className="ml-4 font-extralight">
                {" "}
                {new Date(singleJob.createdAt).toLocaleDateString()}
              </span>
            </h1>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <div>nothing to show</div>;
  }
};

export default JobDescription;


