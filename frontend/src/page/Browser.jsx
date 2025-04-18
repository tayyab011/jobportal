import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Browser = () => {
   useGetAllJobs()
    const {allJobs}=useSelector(store=>store.job)

      const dispatch = useDispatch();
     useEffect(() => {
       return () => {
         dispatch(setSearchedQuery(""));
       };
     }, []); 
  
    return (
      <Layout>
        <div className=" container mx-auto px-5 py-16">
          <h1 className="font-stretch-extra-condensed text-lg font-bold ">
            Search Result ({allJobs.length}) :
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-6 grid-cols-1 mt-12">
            {
            
            allJobs.map((job) =>{
              console.log("Rendering job:", job._id, job.title);
             return (  <JobCard key={job._id} job={job} />)}
            )
            
            
            }
            
          </div>
        </div>
      </Layout>
    );
};

export default Browser;